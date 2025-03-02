import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "../index.css"; 
import { useUser } from "../context/UserContext.jsx";
import QRCode from "qrcode";

const Game = () => {
  const { fetchUserDetails } = useUser(); //  Only used inside function component

  useEffect(() => {
    fetchUserDetails(); // This will update the header score after an answer
  }, []);

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [firstAttemptMade, setFirstAttemptMade] = useState(false);
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false); // Track correct answer
  const [selectedOptionStatus, setSelectedOptionStatus] = useState({}); // Track option color
  const [inviteImage, setInviteImage] = useState(null); // Store the generated image
  const [inviteMessage, setInviteMessage] = useState(""); //  Store the invite text
  const [inviteLink, setInviteLink] = useState(""); //  Store the invite link

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");
        return;
      }
  
      const response = await apiClient.get(`/destination/random?token=${token}`);
  
      if (response.data.status === "completed") {
        setQuestion(null); // Clear question state
        setFeedback("✅ You've completed all available destinations!");
        return; // Stop further execution
      }
  
      setQuestion(response.data);
      setSelectedAnswer(null);
      setFeedback(null);
      setFirstAttemptMade(false);
      setShowConfetti(false);
      setIsShaking(false);
      setCorrectAnswerGiven(false);
      setSelectedOptionStatus({});
    } catch (error) {
      console.error("Error fetching question", error);
    }
  };
  

  const submitAnswer = async () => {
    if (!selectedAnswer) return;

    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post(`/game/submit?token=${token}`, {
        destination_id: question.id,
        user_answer: selectedAnswer,
      });

      if (response.data.correct) {
        setFeedback(`🎉 Correct! ${response.data.fun_fact}`);
        setShowConfetti(true); // Show confetti effect
        setCorrectAnswerGiven(true); //  Disable submit button
        setSelectedOptionStatus({ [selectedAnswer]: "bg-green-500 text-white" }); // Green for correct
      } else {
        setFeedback(`😢 Wrong! Try again! ${response.data.fun_fact}`);
        setIsShaking(true); //  Apply shake effect
        setTimeout(() => setIsShaking(false), 500); //  Remove shake after animation
        setSelectedOptionStatus((prev) => ({
          ...prev,
          [selectedAnswer]: "bg-red-500 text-white", //  Red for incorrect
        }));
      }

      setFirstAttemptMade(true);
      fetchUserDetails();
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

  const generateInviteImage = async (user_name, correct, incorrect, inviteLink, friendUsername) => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
  
    // Background
    ctx.fillStyle = "#3498db";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    //  Title
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("🌍 Globetrotter Challenge!", 100, 40);
  
    // Inviter's Name
    ctx.font = "20px Arial";
    ctx.fillText(`📢 ${user_name} has challenged you!`, 80, 80);
  
    // Score
    ctx.fillText(`🏆 Score: ${correct} ✅ / ${incorrect} ❌`, 80, 120);
  
    // Invitee's Name
    ctx.fillText(`Hey ${friendUsername}, can you beat me?`, 80, 160);
  
    ctx.fillText(`Scan the QR code to join the game`, 80, 200);
    // Generate QR Code for Invite Link and Add to Image
    const qrCodeDataUrl = await QRCode.toDataURL(inviteLink, { width: 70 });
    const qrImg = new Image();
    qrImg.src = qrCodeDataUrl;
  
    await new Promise((resolve) => {
      qrImg.onload = () => {
        ctx.drawImage(qrImg, canvas.width/2, canvas.height - 90, 70, 70); // Bottom Right
        resolve();
      };
    });
  
    // Convert Canvas to Image
    const imageUrl = canvas.toDataURL("image/png");
  
    setInviteImage(imageUrl);
    setInviteLink(inviteLink); // Already included in the image via QR code, no need to append text
  };
  
  // Optimized `shareInvite` - Now Shares Directly
  const shareInvite = async () => {
    try {
      if (!inviteImage) {
        alert("No invite ready to share.");
        return;
      }
  
      // Convert to Blob
      const blob = await (await fetch(inviteImage)).blob();
      const file = new File([blob], "globetrotter_invite.png", { type: "image/png" });
  
      // Share via Web Share API
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Globetrotter Challenge",
          files: [file]
        });
      } else {
        // Fallback: Open WhatsApp with Image
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(inviteLink)}`;
        window.open(whatsappURL, "_blank");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
      alert("❌ Failed to share the invite.");
    }
  };  

  const handleChallenge = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to challenge a friend.");
      return;
    }
  
    try {
      // Fetch current user's details (username & score)
      const response = await apiClient.get(`/user/details?token=${token}`);
      const { user_name, correct_attempts, incorrect_attempts } = response.data;
      console.log(response.data)
      if (!user_name) {
        alert("Error fetching your details. Please try again.");
        return;
      }
  
      const friendUsername = prompt("Enter your friend's username to invite:");
      if (!friendUsername || friendUsername.trim() === "") {
        alert("❌ Friend's username cannot be empty.");
        return;
      }
  
      // Include current user's score in the invite message
      const inviteLink = `${window.location.origin}/invite?user=${user_name}&friend=${friendUsername}`;
      generateInviteImage(user_name, correct_attempts, incorrect_attempts, inviteLink, friendUsername);
    } catch (error) {
      console.error("Error fetching user details", error);
      alert("❌ Failed to get user details. Please try again.");
    }
  };
  
  
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mt-6">
      {feedback === "✅ You've completed all available destinations!" ? (
        <p className="text-lg font-semibold text-green-600">{feedback}</p>
        ) : question ? (
          <>
            <h2 className={`text-xl font-bold mb-4 ${isShaking ? "shake" : ""}`}>
              Guess the Destination
            </h2>

            {/* Display Clues */}
            <ul className="mb-4 text-gray-700">
              {question.clues.map((clue, index) => (
                <li key={index} className="mb-2">🔹 {clue}</li>
              ))}
            </ul>

            {/* Display Answer Options */}
            {question.answer_options.map((option) => (
            <button
              key={option}
              className={`w-full p-3 border rounded mb-2 ${
                selectedAnswer === option
                  ? selectedOptionStatus[option] || "bg-blue-500 text-white"
                  : correctAnswerGiven
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Gray out disabled options
                  : "bg-gray-200 hover:bg-blue-400 transition"
              }`}
              onClick={() => {
                if (!correctAnswerGiven) {
                  setSelectedAnswer(option);
                  setSelectedOptionStatus({});
                }
              }}
              disabled={correctAnswerGiven} // Disable selection after correct answer
            >
              {option}
            </button>
            ))}



            <button
              className={`w-full py-3 rounded mt-4 transition ${
                correctAnswerGiven
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Gray when disabled
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={submitAnswer}
              disabled={correctAnswerGiven} // Disable after correct answer
            >
              Submit Answer
            </button>


            {/* Show Feedback */}
            {feedback && (
              <p className="mt-4 text-lg font-semibold">
                {feedback} {showConfetti && <span className="confetti">🎊🎉✨</span>}
              </p>
            )}

            {/* Next Question Button (Appears After First Attempt) */}
            {firstAttemptMade && (
              <button
                className="w-full bg-purple-500 text-white py-3 rounded mt-4 hover:bg-purple-600 transition"
                onClick={fetchQuestion}
              >
                Next Question
              </button>
            )}

            {/* Challenge a Friend Button - Always Visible */}
            <button
              className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-600 transition"
              onClick={handleChallenge}
            >
              Challenge a Friend
            </button>

            {/* Show Generated Invite Image */}
            {inviteImage && (
              <div className="text-center mt-4">
                <p className="font-bold">📸 Your Invite Image:</p>
                <img src={inviteImage} alt="Invite" className="w-full max-w-md mt-2 rounded-lg shadow-lg" />
            
                {/* Share Now Button */}
                <button
                  className="w-full bg-green-500 text-white py-2 px-4 rounded mt-3 hover:bg-green-600 transition"
                  onClick={shareInvite}
                >
                  Share Now
                </button>
              </div>
            )}


          </>
        ) : (
          <p>Loading question...</p>
        )}
      </div>
    </div>
  );
};

export default Game;
