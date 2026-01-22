import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Play, Check, X, HelpCircle, Plus, Minus, Equal, Search, Award } from 'lucide-react';

const Slide = ({ children, title, subtitle, bgFrom, bgTo }) => (
  <div className={`flex flex-col h-full w-full bg-gradient-to-br ${bgFrom} ${bgTo} p-4 md:p-6 rounded-xl shadow-2xl overflow-hidden relative`}>
    <div className="absolute top-0 left-0 w-full h-2 bg-white/30"></div>
    <div className="mb-2 md:mb-4 text-center shrink-0">
      <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md mb-1 tracking-wider">{title}</h1>
      {subtitle && <p className="text-white/90 text-sm md:text-lg font-medium bg-black/10 inline-block px-4 py-1 rounded-full">{subtitle}</p>}
    </div>
    <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-2xl shadow-inner p-4 md:p-8 overflow-hidden flex flex-col justify-center items-center relative border-4 border-white/50 w-full">
      <div className="w-full h-full flex flex-col justify-center items-center overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  </div>
);

const Character = ({ type }) => {
  const symbolMap = {
    plus: { char: "+", color: "bg-blue-500" },
    minus: { char: "-", color: "bg-red-500" },
    equal: { char: "=", color: "bg-yellow-500" },
  };
  
  const charData = symbolMap[type] || symbolMap.plus;
  
  return (
    <div className={`relative flex flex-col items-center animate-bounce-slow transform scale-75 md:scale-100`}>
      <div className={`${charData.color} text-white font-black rounded-full flex items-center justify-center shadow-lg border-4 border-white transform hover:scale-110 transition-transform cursor-pointer
        ${type === 'minus' ? 'w-20 h-12 md:w-32 md:h-20' : 'w-20 h-20 md:w-28 md:h-28'}
      `}>
        <span className="text-5xl md:text-7xl">{charData.char}</span>
      </div>
      <div className="mt-2 text-center font-bold text-gray-700 bg-white px-3 py-1 rounded-lg border-2 border-gray-200 shadow-sm whitespace-nowrap text-sm md:text-base">
        {type === 'plus' ? '合體隊長' : type === 'minus' ? '比較偵探' : '公平裁判'}
      </div>
    </div>
  );
};

const QuizOption = ({ formula, isCorrect, isSelected, onClick, disabled }) => {
  let bgClass = "bg-white hover:bg-indigo-50 border-gray-200";
  let textClass = "text-gray-700";
  
  if (disabled) {
    if (isSelected && isCorrect) {
      bgClass = "bg-green-100 border-green-500";
      textClass = "text-green-800";
    } else if (isSelected && !isCorrect) {
      bgClass = "bg-red-100 border-red-500";
      textClass = "text-red-800";
    } else if (!isSelected && isCorrect) {
       // Show correct answer even if not selected
       bgClass = "bg-green-50 border-green-300 opacity-60";
       textClass = "text-green-800";
    } else {
      bgClass = "bg-gray-50 border-gray-100 opacity-50";
      textClass = "text-gray-400";
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 md:p-6 rounded-2xl border-4 text-2xl md:text-3xl font-black shadow-md transition-all transform ${!disabled && 'hover:-translate-y-1 hover:shadow-lg'} ${bgClass} ${textClass} flex items-center justify-center relative`}
    >
      {formula}
      {disabled && isSelected && isCorrect && <Check className="absolute right-4 w-8 h-8 text-green-600" strokeWidth={4} />}
      {disabled && isSelected && !isCorrect && <X className="absolute right-4 w-8 h-8 text-red-600" strokeWidth={4} />}
    </button>
  );
};

const MathAdventure = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizSelection, setQuizSelection] = useState(null);

  // Reset states when changing slides
  useEffect(() => {
    setShowAnswer(false);
    setQuizSelection(null);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleQuizSelect = (index) => {
    setQuizSelection(index);
  };

  const totalSlides = 15;

  const renderSlideContent = () => {
    switch(currentSlide) {
      case 0: // Cover
        return (
          <div className="flex flex-col items-center justify-center space-y-6 text-center h-full">
            <div className="flex space-x-6 mb-4">
              <div className="animate-bounce" style={{animationDelay: '0s'}}><Character type="plus" /></div>
              <div className="animate-bounce" style={{animationDelay: '0.2s'}}><Character type="equal" /></div>
              <div className="animate-bounce" style={{animationDelay: '0.4s'}}><Character type="minus" /></div>
            </div>
            <div className="bg-yellow-100 p-6 rounded-3xl border-4 border-yellow-300 transform -rotate-2 shadow-lg">
              <p className="text-xl md:text-2xl font-bold text-yellow-800 mb-4">今天破解三個謎題：</p>
              <ul className="text-left space-y-3 text-lg md:text-xl font-bold text-gray-700">
                <li className="flex items-center"><span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">1</span> 共有多少？</li>
                <li className="flex items-center"><span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">2</span> 相差多少？</li>
                <li className="flex items-center"><span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">3</span> 誰是老大？</li>
              </ul>
            </div>
            <button onClick={nextSlide} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl md:text-2xl font-bold py-3 px-10 rounded-full shadow-lg transform transition hover:scale-105 flex items-center animate-pulse">
              開始冒險 <Play className="ml-3 w-6 h-6" />
            </button>
          </div>
        );

      case 1: // Symbols
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full content-center px-4">
            <div className="bg-blue-50 p-4 rounded-2xl border-4 border-blue-200 flex flex-col items-center hover:bg-blue-100 transition duration-300 shadow-md">
              <Character type="plus" />
              <h3 className="text-xl font-black text-blue-600 mt-3 mb-1">合體隊長</h3>
              <p className="text-center text-gray-600 font-medium text-sm md:text-base">「左邊一堆，右邊一堆，<br/>加號來幫忙，<br/><span className="text-blue-600 font-bold">黏成一大堆！</span>」</p>
              <div className="mt-2 text-3xl">🍎 ➕ 🍌</div>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border-4 border-red-200 flex flex-col items-center hover:bg-red-100 transition duration-300 shadow-md">
              <Character type="minus" />
              <h3 className="text-xl font-black text-red-600 mt-3 mb-1">比較偵探</h3>
              <p className="text-center text-gray-600 font-medium text-sm md:text-base">「我有兩個工作：<br/>1. 拿走不見了<br/>2. <span className="text-red-600 font-bold">排排站，比比看</span>」</p>
              <div className="mt-2 text-3xl">📏 ✂️</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl border-4 border-yellow-200 flex flex-col items-center hover:bg-yellow-100 transition duration-300 shadow-md">
              <Character type="equal" />
              <h3 className="text-xl font-black text-yellow-600 mt-3 mb-1">公平裁判</h3>
              <p className="text-center text-gray-600 font-medium text-sm md:text-base">「我不是『答案在後面』喔！<br/>我是說<br/><span className="text-yellow-600 font-bold">左邊右邊一樣重！</span>」</p>
              <div className="mt-2 text-3xl">⚖️</div>
            </div>
          </div>
        );

      case 2: // Total
        return (
          <div className="flex flex-col items-center justify-center h-full w-full gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">左邊 3 顆，右邊 2 顆，<span className="text-blue-600">共有</span>幾顆？</h2>
            <div className="relative flex items-center justify-center w-full max-w-3xl bg-blue-50 rounded-3xl p-8 border-dashed border-4 border-blue-200 min-h-[250px]">
               <div className="flex flex-col items-center mx-6 group">
                  <div className="text-5xl md:text-6xl mb-2 group-hover:scale-110 transition">🍎🍎🍎</div>
                  <span className="text-2xl font-bold text-gray-500">3</span>
               </div>
               <div className="mx-2 animate-bounce">
                  <Plus className="w-12 h-12 text-blue-500" strokeWidth={4} />
               </div>
               <div className="flex flex-col items-center mx-6 group">
                  <div className="text-5xl md:text-6xl mb-2 group-hover:scale-110 transition">🍎🍎</div>
                  <span className="text-2xl font-bold text-gray-500">2</span>
               </div>
               {showAnswer && (
                 <div className="absolute inset-0 border-8 border-blue-400/50 rounded-full animate-pulse flex items-center justify-center pointer-events-none">
                    <span className="bg-white text-blue-600 font-bold px-6 py-2 rounded-full text-2xl shadow-xl absolute -top-6">合體變大堆！</span>
                 </div>
               )}
            </div>
            <div className="h-20 flex items-center">
              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)} className="bg-blue-500 text-white font-bold py-3 px-10 rounded-full shadow-lg text-xl hover:bg-blue-600 transition hover:scale-105">
                  呼叫合體隊長！
                </button>
              ) : (
                <div className="bg-white border-4 border-blue-500 p-4 px-8 rounded-2xl shadow-xl flex items-center animate-pop-in">
                  <span className="text-4xl font-black text-gray-700 mr-4">3 + 2 = </span>
                  <span className="text-5xl font-black text-blue-600">5</span>
                </div>
              )}
            </div>
          </div>
        );

      case 3: // Difference Part 1
        return (
          <div className="flex flex-col items-center h-full w-full justify-center">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700">狗狗 5 隻，貓咪 3 隻，狗狗比貓咪<span className="text-red-600">多幾隻</span>？</h2>
              <p className="text-gray-500 mt-1">（相差幾隻？）</p>
            </div>
            <div className="relative bg-white rounded-3xl p-6 border-4 border-gray-100 w-full max-w-4xl flex flex-col justify-center my-4 min-h-[250px]">
              <div className="flex items-center mb-6 justify-center">
                <span className="text-2xl font-bold text-gray-400 w-16 mr-4 text-right">狗狗</span>
                <div className="flex space-x-2 md:space-x-4">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={`dog-${n}`} className="relative text-4xl md:text-5xl">🐶</div>
                  ))}
                </div>
                <span className="ml-4 text-3xl font-bold text-gray-700 w-8">5</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400 w-16 mr-4 text-right">貓咪</span>
                <div className="flex space-x-2 md:space-x-4">
                  {[1, 2, 3].map(n => (
                    <div key={`cat-${n}`} className="relative text-4xl md:text-5xl">🐱</div>
                  ))}
                  <div className="w-[36px] md:w-[48px]"></div>
                  <div className="w-[36px] md:w-[48px]"></div>
                </div>
                <span className="ml-4 text-3xl font-bold text-gray-700 w-8">3</span>
              </div>
              {showAnswer && (
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                   <line x1="38%" y1="35%" x2="38%" y2="65%" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="8" />
                   <line x1="46%" y1="35%" x2="46%" y2="65%" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="8" />
                   <line x1="54%" y1="35%" x2="54%" y2="65%" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="8" />
                   <rect x="35%" y="25%" width="22%" height="55%" rx="10" fill="none" stroke="#94A3B8" strokeWidth="3" />
                   <text x="38%" y="22%" fill="#64748B" fontSize="16" fontWeight="bold">抵銷 (一樣多)</text>
                   <rect x="58%" y="25%" width="15%" height="30%" rx="10" fill="rgba(255,0,0,0.1)" stroke="#EF4444" strokeWidth="4" />
                   <text x="59%" y="20%" fill="#EF4444" fontSize="18" fontWeight="bold">相差 2 隻！</text>
                </svg>
              )}
            </div>
            <div className="h-20 flex items-center">
              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)} className="bg-red-500 text-white font-bold py-3 px-10 rounded-full shadow-lg text-xl hover:bg-red-600 transition flex items-center">
                  <Search className="mr-2" /> 派出比較偵探
                </button>
              ) : (
                <div className="bg-white border-4 border-red-500 p-4 px-8 rounded-2xl shadow-xl flex items-center animate-pop-in">
                  <span className="text-4xl font-black text-gray-700 mr-4">5 - 3 = </span>
                  <span className="text-5xl font-black text-red-600">2</span>
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Trap 1
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl gap-4 md:gap-6">
             <div className="flex items-center shrink-0">
                <X className="text-red-500 w-10 h-10 md:w-12 md:h-12 mr-3" />
                <h2 className="text-2xl md:text-3xl font-black text-red-600">陷阱一：小減大？</h2>
             </div>
             <div className="bg-red-50 rounded-2xl p-6 md:p-8 border-4 border-red-200 w-full flex flex-col items-center shadow-lg">
                <div className="text-center mb-4 md:mb-6">
                  <div className="text-5xl md:text-6xl font-black text-gray-300 line-through decoration-red-500 decoration-8 mb-2">3 - 5 = ?</div>
                  <div className="text-6xl md:text-8xl">🐱 ➖ 🐶</div>
                </div>
                <div className="bg-white p-4 rounded-xl text-lg md:text-xl text-gray-700 shadow-sm border-l-8 border-red-500 w-full text-center">
                  <p className="font-bold text-red-600 text-2xl mb-1">偵探說：</p>
                  <p>「手指頭只有 3 根，怎麼凹下 5 根呢？」</p>
                </div>
             </div>
             <div className="w-full bg-green-100 p-6 md:p-8 rounded-3xl border-4 border-green-400 flex flex-col items-center justify-center shadow-xl animate-bounce-slow shrink-0">
                <span className="text-green-800 font-bold text-xl md:text-2xl mb-2 md:mb-4 bg-white px-4 py-1 rounded-full shadow-sm">✨ 黃金口訣 ✨</span>
                <span className="text-3xl md:text-5xl font-black text-green-600 tracking-wide text-center leading-relaxed">
                  大數 ➖ 小數 🟰 相差
                </span>
             </div>
          </div>
        );

      case 5: // Trap 2
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl">
             <div className="flex items-center mb-6">
                <X className="text-red-500 w-12 h-12 mr-3" />
                <h2 className="text-3xl font-black text-red-600">陷阱二：亂用加法？</h2>
             </div>
             <div className="bg-red-50 rounded-2xl p-10 border-4 border-red-200 w-full flex flex-col items-center shadow-lg">
                <div className="text-center mb-8">
                  <div className="text-6xl font-black text-gray-300 line-through decoration-red-500 decoration-8 mb-4">5 + 3 = 8</div>
                  <div className="text-8xl">🐶 ➕ 🐱</div>
                </div>
                <div className="bg-white p-6 rounded-xl text-xl text-gray-700 shadow-sm border-l-8 border-red-500">
                  <p className="font-bold text-red-600 text-2xl mb-2">偵探說：</p>
                  <p>「題目問 <span className="text-red-500 font-bold">相差</span> (多出來的部分)，不是問 <span className="text-blue-500 font-bold">一共</span>！」</p>
                  <p className="mt-2 text-gray-500">不要用加號膠水把大家都黏在一起！</p>
                </div>
             </div>
          </div>
        );

      case 6: // Trap 3
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl">
             <div className="flex items-center mb-6">
                <X className="text-red-500 w-12 h-12 mr-3" />
                <h2 className="text-3xl font-black text-red-600">陷阱三：數字哪來的？</h2>
             </div>
             <div className="bg-red-50 rounded-2xl p-10 border-4 border-red-200 w-full flex flex-col items-center shadow-lg">
                <div className="text-center mb-8">
                  <div className="text-6xl font-black text-gray-300 line-through decoration-red-500 decoration-8 mb-4">8 - 5 = 3</div>
                </div>
                <div className="bg-white p-6 rounded-xl text-xl text-gray-700 shadow-sm border-l-8 border-red-500 w-full text-center">
                   <p className="font-bold text-red-600 text-2xl mb-2">偵探說：</p>
                   <p>「那個 8 是哪來的？別自己變魔術！<br/>只能用題目給的 5 和 3 來比賽。」</p>
                </div>
             </div>
          </div>
        );

      case 7: // Strategy Problem
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <h2 className="text-3xl font-bold text-gray-800 mb-8">遇到「比多比少」怎麼辦？</h2>
             <div className="bg-gray-100 rounded-full p-10 inline-block mb-6 shadow-inner">
               <span className="text-8xl">😭</span>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl border-2 border-gray-100">
               <p className="text-2xl text-gray-600 font-medium leading-relaxed">
                 「看到『多』就用加？<br/>
                 看到『少』就用減？<br/>
                 <span className="text-red-500 font-bold">結果都算錯...怎麼辦？</span>」
               </p>
             </div>
          </div>
        );

      case 8: // Strategy Solution
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl">
             <div className="bg-yellow-50 p-8 rounded-3xl shadow-xl border-4 border-yellow-300 text-left w-full">
                <h3 className="text-3xl font-black text-yellow-600 mb-8 flex items-center justify-center border-b-2 border-yellow-200 pb-4">
                  <span className="bg-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 text-2xl">💡</span>
                  破解秘技：找老大三步驟
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="bg-gray-200 text-gray-700 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">1</div>
                    <p className="text-2xl font-bold text-gray-700">圈角色 <span className="text-lg text-gray-500 font-normal ml-2">(題目裡有誰？)</span></p>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-md border-2 border-yellow-400 transform scale-105">
                    <div className="bg-yellow-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">2</div>
                    <div className="flex flex-col">
                      <p className="text-2xl font-black text-gray-800">找老大 <span className="text-base text-red-500 font-bold bg-red-50 px-2 rounded ml-2">關鍵！</span></p>
                      <p className="text-base text-gray-500">誰的數量比較多？他就是老大！</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="bg-gray-200 text-gray-700 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">3</div>
                    <p className="text-2xl font-bold text-gray-700">選算式 <span className="text-lg text-gray-500 font-normal ml-2">(算老大用 +，算小弟用 -)</span></p>
                  </div>
                </div>
             </div>
          </div>
        );

      case 9: // Practice 1 (Brother)
        return (
          <div className="flex flex-col items-center w-full h-full justify-between py-2">
             <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-2 border-indigo-100 w-full mb-4 shrink-0">
               <h2 className="text-lg md:text-2xl font-bold text-gray-800 leading-relaxed text-center">
                 弟弟有 8 顆糖，哥哥比弟弟 <span className="text-red-500 font-black bg-red-100 px-2 rounded">多</span> 3 顆，哥哥有幾顆？
               </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full overflow-hidden">
                <div className="flex flex-col justify-center items-end pr-4 border-r-2 border-dashed border-gray-200 h-full">
                   <div className="flex items-center w-full justify-end mb-4 group">
                      <span className="mr-3 font-bold text-gray-600 whitespace-nowrap text-xl">哥哥</span>
                      <div className="h-14 md:h-20 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-2xl relative transition-all duration-1000 w-[90%]">
                         {showAnswer ? '?' : '老大'}
                         <span className="absolute -top-6 md:-top-8 text-blue-600 text-sm md:text-base font-bold animate-bounce bg-white px-2 rounded-full shadow-sm border border-blue-100">我是老大!</span>
                      </div>
                   </div>
                   <div className="flex items-center w-full justify-end">
                      <span className="mr-3 font-bold text-gray-600 whitespace-nowrap text-xl">弟弟</span>
                      <div className="h-14 md:h-20 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xl w-[60%]">
                         8
                      </div>
                      <div className="ml-2 w-[30%] border-t-2 border-b-2 border-r-2 border-red-400 h-14 md:h-20 rounded-r-lg flex items-center justify-center text-red-500 font-bold relative bg-red-50/50">
                         <span className="bg-white px-2 py-1 rounded text-sm md:text-base absolute -right-4 md:-right-8 w-24 text-center shadow-sm border border-red-100">多 3 顆</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col justify-center pl-2 md:pl-4">
                   {!showAnswer ? (
                     <button onClick={() => setShowAnswer(true)} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 px-6 rounded-2xl shadow-lg text-xl flex justify-between items-center group transition transform hover:-translate-y-1">
                       <span>1. 誰是老大？</span>
                       <div className="bg-white/20 p-2 rounded-full">
                         <HelpCircle className="w-8 h-8 group-hover:rotate-12 transition" />
                       </div>
                     </button>
                   ) : (
                     <div className="space-y-4 animate-fade-in-up w-full">
                       <div className="bg-blue-50 p-5 rounded-2xl border-l-8 border-blue-500 shadow-sm">
                         <p className="font-bold text-blue-800 text-lg mb-1">🕵️ 偵探分析：</p>
                         <p className="text-xl">哥哥比較多 ➝ <span className="font-black text-2xl text-blue-600 block mt-1">哥哥是老大！</span></p>
                       </div>
                       <div className="bg-green-50 p-5 rounded-2xl border-l-8 border-green-500 shadow-sm">
                         <p className="font-bold text-green-800 text-lg mb-1">🧮 怎麼算？</p>
                         <p className="text-gray-700 text-lg">算老大(大數)用加法</p>
                         <div className="mt-3 text-center text-4xl font-black text-green-600 bg-white py-3 rounded-xl shadow-inner border border-green-100">
                           8 + 3 = 11
                         </div>
                       </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        );

      case 10: // Practice 2 (Balloon)
        return (
          <div className="flex flex-col items-center w-full h-full justify-between py-2">
             <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border-2 border-indigo-100 w-full mb-4 shrink-0">
               <h2 className="text-lg md:text-2xl font-bold text-gray-800 leading-relaxed text-center">
                 紅氣球 12 個，藍氣球比紅氣球 <span className="text-green-500 font-black bg-green-100 px-2 rounded">少</span> 4 個，藍氣球有幾個？
               </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full overflow-hidden">
                <div className="flex flex-col justify-center items-end pr-4 border-r-2 border-dashed border-gray-200 h-full">
                   <div className="flex items-center w-full justify-end mb-4 group">
                      <span className="mr-3 font-bold text-gray-600 whitespace-nowrap text-xl">紅氣球</span>
                      <div className="h-14 md:h-20 bg-red-400 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-2xl w-full relative">
                         12
                         {showAnswer && <span className="absolute -top-6 md:-top-8 text-red-400 text-sm md:text-base font-bold bg-white px-2 rounded-full shadow-sm border border-red-100">我是老大</span>}
                      </div>
                   </div>
                   <div className="flex items-center w-full justify-end">
                      <span className="mr-3 font-bold text-gray-600 whitespace-nowrap text-xl">藍氣球</span>
                      <div className="h-14 md:h-20 bg-blue-300 rounded-lg flex items-center justify-center text-white font-bold text-xl w-[70%] relative transition-all duration-1000">
                         ?
                         <span className="absolute -bottom-6 md:-bottom-8 text-blue-400 text-sm md:text-base font-bold bg-white px-2 rounded-full shadow-sm border border-blue-100">我是小弟</span>
                      </div>
                      <div className="ml-2 w-[30%] border-t-2 border-b-2 border-r-2 border-dashed border-gray-300 h-14 md:h-20 rounded-r-lg flex items-center justify-center text-gray-400 font-bold relative opacity-50 bg-gray-50">
                         <span className="bg-white px-2 py-1 rounded text-sm md:text-base absolute -right-4 md:-right-10 w-24 text-center shadow-sm border border-gray-200">少 4 個</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col justify-center pl-2 md:pl-4">
                   {!showAnswer ? (
                     <button onClick={() => setShowAnswer(true)} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-6 px-6 rounded-2xl shadow-lg text-xl flex justify-between items-center group transition transform hover:-translate-y-1">
                       <span>1. 誰是老大？</span>
                       <div className="bg-white/20 p-2 rounded-full">
                         <HelpCircle className="w-8 h-8 group-hover:rotate-12 transition" />
                       </div>
                     </button>
                   ) : (
                     <div className="space-y-4 animate-fade-in-up w-full">
                       <div className="bg-red-50 p-5 rounded-2xl border-l-8 border-red-500 shadow-sm">
                         <p className="font-bold text-red-800 text-lg mb-1">🕵️ 偵探分析：</p>
                         <p className="text-xl">藍比紅少 ➝ <span className="font-black text-2xl text-blue-600 block mt-1">藍是小弟！</span></p>
                       </div>
                       <div className="bg-green-50 p-5 rounded-2xl border-l-8 border-green-500 shadow-sm">
                         <p className="font-bold text-green-800 text-lg mb-1">🧮 怎麼算？</p>
                         <p className="text-gray-700 text-lg">算小弟(小數)用減法</p>
                         <div className="mt-3 text-center text-4xl font-black text-green-600 bg-white py-3 rounded-xl shadow-inner border border-green-100">
                           12 - 4 = 8
                         </div>
                       </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        );

      case 11: // Summary (Intermediate)
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-3xl md:text-5xl font-black text-yellow-500 mb-6 drop-shadow-sm">學習完成！<br/>準備好接受挑戰了嗎？</h1>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-yellow-300 w-full max-w-2xl">
              <p className="text-xl text-gray-600 mb-8">接下來有 3 題挑戰題，請選出正確的算式！</p>
              <button onClick={nextSlide} className="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-105 flex items-center mx-auto animate-pulse">
                開始挑戰 <Award className="ml-3 w-8 h-8" />
              </button>
            </div>
          </div>
        );

      case 12: // Quiz 1 (Total)
        return (
          <div className="flex flex-col items-center w-full h-full max-w-4xl">
             <div className="mb-6 w-full text-center">
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold mb-2">挑戰題 1 / 3</div>
                <h2 className="text-2xl font-bold text-gray-800">
                   紅色蛋糕 6 個，藍色蛋糕 3 個，<span className="text-blue-600">共有</span>幾個？
                </h2>
             </div>
             <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mb-6 flex gap-8 items-center justify-center w-full">
                <div className="text-center">
                  <span className="text-5xl block mb-2">🧁</span>
                  <span className="font-bold text-gray-500">6 個</span>
                </div>
                <Plus className="text-blue-300 w-10 h-10" />
                <div className="text-center">
                  <span className="text-5xl block mb-2">🧁</span>
                  <span className="font-bold text-gray-500">3 個</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <QuizOption 
                  formula="6 - 3 = 3" 
                  isCorrect={false} 
                  isSelected={quizSelection === 0} 
                  onClick={() => handleQuizSelect(0)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="6 + 3 = 9" 
                  isCorrect={true} 
                  isSelected={quizSelection === 1} 
                  onClick={() => handleQuizSelect(1)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="3 + 3 = 6" 
                  isCorrect={false} 
                  isSelected={quizSelection === 2} 
                  onClick={() => handleQuizSelect(2)} 
                  disabled={quizSelection !== null}
                />
             </div>
             {quizSelection !== null && (
               <div className="mt-6 animate-fade-in-up">
                 {quizSelection === 1 ? (
                   <div className="text-green-600 font-bold text-xl flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                     <Check className="mr-2" /> 答對了！共有就是合起來 (加法)。
                   </div>
                 ) : (
                   <div className="text-red-500 font-bold text-xl flex items-center bg-red-50 px-6 py-3 rounded-full border border-red-200">
                     <X className="mr-2" /> 再想一想，共有要用加號膠水喔！
                   </div>
                 )}
               </div>
             )}
          </div>
        );

      case 13: // Quiz 2 (Difference)
        return (
          <div className="flex flex-col items-center w-full h-full max-w-4xl">
             <div className="mb-6 w-full text-center">
                <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full font-bold mb-2">挑戰題 2 / 3</div>
                <h2 className="text-2xl font-bold text-gray-800">
                   星星 8 顆，月亮 5 顆，<span className="text-red-600">相差</span>幾顆？
                </h2>
             </div>
             <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 mb-6 flex flex-col gap-2 items-center justify-center w-full">
                <div className="flex items-center gap-2">
                   <span className="w-16 text-right font-bold text-gray-400">星星</span>
                   <span className="text-3xl">⭐⭐⭐⭐⭐⭐⭐⭐</span>
                   <span className="font-bold ml-2">8</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-16 text-right font-bold text-gray-400">月亮</span>
                   <span className="text-3xl">🌙🌙🌙🌙🌙</span>
                   <span className="font-bold ml-2">5</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <QuizOption 
                  formula="8 + 5 = 13" 
                  isCorrect={false} 
                  isSelected={quizSelection === 0} 
                  onClick={() => handleQuizSelect(0)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="8 - 5 = 3" 
                  isCorrect={true} 
                  isSelected={quizSelection === 1} 
                  onClick={() => handleQuizSelect(1)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="5 - 8 = ?" 
                  isCorrect={false} 
                  isSelected={quizSelection === 2} 
                  onClick={() => handleQuizSelect(2)} 
                  disabled={quizSelection !== null}
                />
             </div>
             {quizSelection !== null && (
               <div className="mt-6 animate-fade-in-up">
                 {quizSelection === 1 ? (
                   <div className="text-green-600 font-bold text-xl flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                     <Check className="mr-2" /> 答對了！相差就是比較，要用減法。
                   </div>
                 ) : (
                   <div className="text-red-500 font-bold text-xl flex items-center bg-red-50 px-6 py-3 rounded-full border border-red-200">
                     <X className="mr-2" /> 小心陷阱！相差不是一共，不能用加法喔。
                   </div>
                 )}
               </div>
             )}
          </div>
        );

      case 14: // Quiz 3 (Compare - More)
        return (
          <div className="flex flex-col items-center w-full h-full max-w-4xl">
             <div className="mb-6 w-full text-center">
                <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-bold mb-2">挑戰題 3 / 3 (魔王題)</div>
                <h2 className="text-2xl font-bold text-gray-800">
                   小猴子有 10 根香蕉，小豬有 4 根香蕉。<br/>
                   小猴子比小豬 <span className="text-red-600 font-black">多</span> 幾根？
                </h2>
             </div>
             <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 mb-6 flex flex-col gap-2 items-center justify-center w-full">
                <div className="flex items-center gap-2">
                   <span className="text-4xl">🐵</span>
                   <span className="text-2xl">🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌</span>
                   <span className="font-bold ml-2">10</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-4xl">🐷</span>
                   <span className="text-2xl">🍌🍌🍌🍌</span>
                   <span className="font-bold ml-2">4</span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <QuizOption 
                  formula="10 + 4 = 14" 
                  isCorrect={false} 
                  isSelected={quizSelection === 0} 
                  onClick={() => handleQuizSelect(0)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="4 + 10 = 14" 
                  isCorrect={false} 
                  isSelected={quizSelection === 1} 
                  onClick={() => handleQuizSelect(1)} 
                  disabled={quizSelection !== null}
                />
                <QuizOption 
                  formula="10 - 4 = 6" 
                  isCorrect={true} 
                  isSelected={quizSelection === 2} 
                  onClick={() => handleQuizSelect(2)} 
                  disabled={quizSelection !== null}
                />
             </div>
             {quizSelection !== null && (
               <div className="mt-6 animate-fade-in-up">
                 {quizSelection === 2 ? (
                   <div className="text-green-600 font-bold text-xl flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                     <Check className="mr-2" /> 太棒了！沒被「多」騙到！問「多幾根」就是問相差。
                   </div>
                 ) : (
                   <div className="text-red-500 font-bold text-xl flex items-center bg-red-50 px-6 py-3 rounded-full border border-red-200">
                     <X className="mr-2" /> 掉進陷阱了！雖然有「多」，但是要算「差距」，要用比較偵探(減法)。
                   </div>
                 )}
               </div>
             )}
          </div>
        );

      default:
        return <div>Slide Not Found</div>;
    }
  };

  const slideBackgrounds = [
    { from: "from-yellow-400", to: "to-orange-500", title: "數學小偵探出動！", subtitle: "破解應用題的秘密" },
    { from: "from-blue-400", to: "to-indigo-500", title: "認識新朋友", subtitle: "符號變身秀" },
    { from: "from-green-400", to: "to-emerald-500", title: "第一關：共有", subtitle: "合體隊長來幫忙" },
    { from: "from-red-400", to: "to-pink-500", title: "第二關：相差 (上)", subtitle: "比較偵探排排站" },
    { from: "from-gray-700", to: "to-gray-900", title: "陷阱一", subtitle: "記得黃金口訣！" },
    { from: "from-gray-700", to: "to-gray-900", title: "陷阱二", subtitle: "亂用加法？" },
    { from: "from-gray-700", to: "to-gray-900", title: "陷阱三", subtitle: "別亂變魔術" },
    { from: "from-purple-400", to: "to-violet-500", title: "第三關：比多比少", subtitle: "怎麼又算錯了..." },
    { from: "from-purple-400", to: "to-violet-500", title: "超級秘技", subtitle: "找老大三步驟" },
    { from: "from-sky-400", to: "to-blue-600", title: "實戰練習", subtitle: "哥哥有多高？" },
    { from: "from-teal-400", to: "to-green-600", title: "實戰練習", subtitle: "氣球有幾顆？" },
    { from: "from-yellow-400", to: "to-orange-500", title: "挑戰準備", subtitle: "你學會了嗎？" },
    { from: "from-blue-500", to: "to-blue-700", title: "挑戰題 1", subtitle: "共有多少？" },
    { from: "from-red-500", to: "to-red-700", title: "挑戰題 2", subtitle: "相差多少？" },
    { from: "from-purple-500", to: "to-purple-700", title: "挑戰題 3", subtitle: "比...多...？" },
  ];

  const currentBg = slideBackgrounds[currentSlide];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-2 md:p-4 select-none">
      <div className="w-full max-w-7xl aspect-video max-h-[90vh] flex flex-col relative shadow-2xl rounded-2xl overflow-hidden bg-white">
        <div className="flex-1 relative z-10 overflow-hidden w-full h-full">
          <Slide 
            title={currentBg.title} 
            subtitle={currentBg.subtitle}
            bgFrom={currentBg.from}
            bgTo={currentBg.to}
          >
            {renderSlideContent()}
          </Slide>
        </div>
        <div className="flex justify-between items-center bg-white/90 backdrop-blur px-4 md:px-8 py-3 md:py-4 border-t border-gray-200 z-20 shrink-0">
           <button 
             onClick={prevSlide} 
             disabled={currentSlide === 0}
             className={`flex items-center px-4 md:px-6 py-2 rounded-full font-bold text-base md:text-lg shadow-sm transition
               ${currentSlide === 0 
                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                 : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-indigo-600 border border-gray-200'}
             `}
           >
             <ArrowLeft className="mr-2 w-5 h-5" /> 上一頁
           </button>
           <div className="flex space-x-1 md:space-x-2">
             {slideBackgrounds.map((_, idx) => (
               <div 
                 key={idx} 
                 className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-indigo-600 w-4 md:w-6' : 'bg-gray-300 w-2 md:w-2'}`}
               />
             ))}
           </div>
           <button 
             onClick={nextSlide} 
             disabled={currentSlide === totalSlides - 1}
             className={`flex items-center px-4 md:px-6 py-2 rounded-full font-bold text-base md:text-lg shadow-sm transition
               ${currentSlide === totalSlides - 1 
                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                 : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'}
             `}
           >
             下一頁 <ArrowRight className="ml-2 w-5 h-5" />
           </button>
        </div>
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes fade-in-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MathAdventure;