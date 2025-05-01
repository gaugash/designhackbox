let currentQuestionIndex = parseInt(localStorage.getItem("questionIndex") || "0");
let scores = JSON.parse(localStorage.getItem("scores") || '{"uxui":0,"web":0,"graphic":0}');

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) {
    // Переход к результату
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.removeItem("questionIndex");
    window.location.href = "result.html";
    return;
  }
  const totalQuestions = questions.length;
  document.getElementById("progressBar").style.width = ((currentQuestionIndex / totalQuestions) * 100) + "%";
  document.querySelector(".question-title").textContent = q.question;

  const answersEl = document.querySelector(".answers");
  answersEl.innerHTML = ""; // очищаем

  q.answers.forEach(answer => {
    const div = document.createElement("div");
    div.className = "answer-card";
    div.textContent = answer.text;
    div.onclick = () => {
      scores[answer.type]++;
      localStorage.setItem("scores", JSON.stringify(scores));
      currentQuestionIndex++; // увеличиваем текущий индекс
      localStorage.setItem("questionIndex", currentQuestionIndex);
      loadQuestion(); // загружаем следующий вопрос без перезагрузки
    };
    answersEl.appendChild(div);
  });
}

if (document.querySelector(".question-screen")) {
  loadQuestion();
}

if (document.querySelector(".result-screen")) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
  
    let maxType = null;
    let maxValue = -1;
    for (let key in scores) {
      if (scores[key] > maxValue) {
        maxValue = scores[key];
        maxType = key;
      }
    }
  
    const titleMap = {
      uxui: "Ты — UX/UI дизайнер!",
      web: "Ты — веб-дизайнер!",
      graphic: "Ты — графический дизайнер!"
    };
  
    const descMap = {
      uxui: "Ты хочешь, чтобы интерфейсы были понятными. Не просто “поставлю кнопку посередине”, а “а он точно поймёт, что это за кнопка?”. Тебе важно, как человек двигается по экрану, куда смотрит, где тормозит. UX/UI-дизайнер — это человек, который сначала думает, а потом рисует. И да, ты, скорее всего, не фанат “красивого ради красивого”. Зато кайфуешь, когда всё продумано до мелочей.",
      web: "Ты не из тех, кто бросается в украшательства. Тебе важно, чтобы сайт был логичным, удобным и вызывал доверие. Ты замечаешь, когда кнопка стоит не там, а отступ рваный. Любишь чистоту в макетах и в голове. Веб-дизайн — это про структуру, порядок и логику. Нужен глаз, рука и голова. Если хочешь делать сайты, которые приятно смотреть и удобно читать — это твоя территория.",
      graphic: "Ты тот человек, который первым скажет «шрифт ужасный» или «а цвета кайф». Тебя тянет в сторону визуала — туда, где нужно придумать стиль, обложку, баннер или упаковку. Графический дизайн — это про вкус, композицию и внимание к мелочам. Не так важно, веб это, печать или афиша — главное, чтобы глаз радовался. Если тебе нравится делать красиво и у тебя чешутся руки, когда видишь плохой визуал — тебе сюда."
    };
  
    const imgMap = {
      uxui: "assets/result.png",
      web: "assets/result.png",
      graphic: "assets/result.png"
    };
  
    document.querySelector(".result-title").textContent = titleMap[maxType];
    document.querySelector(".result-description").textContent = descMap[maxType];
    document.querySelector(".result-image").src = imgMap[maxType];
  
    localStorage.clear(); // сбрасываем всё
  }