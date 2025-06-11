
    // Theme Management
    document.addEventListener("DOMContentLoaded", () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("bg-gray-900", "text-white");
        document.body.classList.remove("bg-white", "text-black");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("bg-gray-900", "text-white");
        document.body.classList.add("bg-white", "text-black");
      }
    });

    document.getElementById("themeToggle").addEventListener("click", () => {
      const html = document.documentElement;
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");

      document.body.classList.toggle("bg-gray-900", isDark);
      document.body.classList.toggle("text-white", isDark);
      document.body.classList.toggle("bg-white", !isDark);
      document.body.classList.toggle("text-black", !isDark);

      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Comments with translation and moderation
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentSection = document.getElementById("commentSection");
    const userCity = "Bangalore";

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = commentInput.value.trim();

      if (/[^a-zA-Z0-9\s\u0C00-\u0C7F\u0900-\u097F\u0600-\u06FF\u4E00-\u9FA5\u3040-\u30FF\uAC00-\uD7A3]+/u.test(text)) {
        alert("Special characters are not allowed.");
        return;
      }

      const commentBox = document.createElement("div");
      commentBox.className = "p-3 bg-gray-100 dark:bg-gray-700 rounded shadow-sm";
      commentBox.innerHTML = `
        <div class="flex justify-between items-center">
          <span>📍 ${userCity}</span>
          <div class="flex space-x-2">
            <button class="likeBtn text-green-600">👍</button>
            <button class="dislikeBtn text-red-600">👎</button>
            <button class="translateBtn text-blue-600">🌐 Translate</button>
          </div>
        </div>
        <p class="mt-2 comment-text">${text}</p>
      `;
      commentSection.appendChild(commentBox);
      commentInput.value = "";

      let dislikes = 0;
      commentBox.querySelector(".dislikeBtn").addEventListener("click", () => {
        dislikes++;
        if (dislikes >= 2) commentBox.remove();
      });
      commentBox.querySelector(".translateBtn").addEventListener("click", () => {
        const p = commentBox.querySelector(".comment-text");
        p.textContent = "[Translated]: " + p.textContent;
      });
    });

    // Video gestures
    const video = document.getElementById('videoPlayer');
    let tapCount = 0;
    let tapTimer;

    video.addEventListener('click', function (e) {
      tapCount++;
      clearTimeout(tapTimer);

      tapTimer = setTimeout(() => {
        const { offsetX, target } = e;
        const width = target.clientWidth;

        if (tapCount === 1) {
          video.paused ? video.play() : video.pause();
        } else if (tapCount === 2) {
          offsetX < width / 2 ? video.currentTime -= 10 : video.currentTime += 10;
        } else if (tapCount === 3) {
          if (offsetX < width / 3) document.getElementById("commentSection").scrollIntoView();
          else if (offsetX > (2 * width) / 3) window.close();
          else alert("Next video...");
        }
        tapCount = 0;
      }, 300);
    });

    // Plan modal logic
    function openPlanModal() {
      document.getElementById('planModal').classList.remove('hidden');
    }
    function closePlanModal() {
      document.getElementById('planModal').classList.add('hidden');
    }

    function payPlan(planName, amount) {
      closePlanModal();
      const options = {
        key: "rzp_test_YourKeyHere", // replace with your Razorpay key
        amount: amount * 100,
        currency: "INR",
        name: "My Video Site",
        description: `${planName} Plan Upgrade`,
        handler: function (response) {
          alert(`Payment successful! Plan upgraded to ${planName}.`);
        },
        theme: { color: "#6366f1" }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    }

    // Download Logic
    let downloadsToday = 0;
    let isPremium = false;

    function attemptDownload() {
      if (isPremium || downloadsToday < 1) {
        downloadsToday++;
        const a = document.createElement("a");
        a.href = "videos/sample.mp4";
        a.download = "video.mp4";
        a.click();
        alert("Download started.");
      } else {
        openDownloadModal();
      }
    }

    function openDownloadModal() {
      document.getElementById("downloadModal").classList.remove("hidden");
    }
    function closeDownloadModal() {
      document.getElementById("downloadModal").classList.add("hidden");
    }

    function payForPremium() {
      closeDownloadModal();
      const options = {
        key: "rzp_test_YourKeyHere", // replace with your Razorpay key
        amount: 5000,
        currency: "INR",
        name: "My Video Site",
        description: "Premium Plan",
        handler: function (response) {
          isPremium = true;
          alert("Premium activated. Unlimited downloads unlocked!");
        },
        theme: { color: "#16a34a" }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    }
