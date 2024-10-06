"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp } from "lucide-react"

// Questions data
const questions = [
  { 
    id: 1, 
    text: "あなたはどちらのタイプですか？", 
    type: "EI",
    options: {
      A: "新しい人々と出会うとエネルギーが湧く。",
      B: "一人で過ごす時間でリフレッシュできる。"
    }
  },
  { 
    id: 2, 
    text: "あなたの考え方は？", 
    type: "EI",
    options: {
      A: "話しながら考えをまとめることが多い。",
      B: "考えをまとめてから話すことが多い。"
    }
  },
  { 
    id: 3, 
    text: "社交的な場面では？", 
    type: "EI",
    options: {
      A: "パーティーやイベントで盛り上がる。",
      B: "小規模な集まりや静かな環境を好む。"
    }
  },
  { 
    id: 4, 
    text: "人間関係について", 
    type: "EI",
    options: {
      A: "多くの友人・知人がいる。",
      B: "親しい友人が少数いる。"
    }
  },
  { 
    id: 5, 
    text: "エネルギーの源は？", 
    type: "EI",
    options: {
      A: "外部からの刺激を求める。",
      B: "内面的な世界を大切にする。"
    }
  },
  { 
    id: 6, 
    text: "情報の扱い方は？", 
    type: "SN",
    options: {
      A: "現実的で実用的な情報を重視する。",
      B: "将来の可能性やアイデアに興味がある。"
    }
  },
  { 
    id: 7, 
    text: "物事の捉え方は？", 
    type: "SN",
    options: {
      A: "具体的な事実や詳細に焦点を当てる。",
      B: "全体像やパターンを把握するのが得意。"
    }
  },
  { 
    id: 8, 
    text: "判断基準は？", 
    type: "SN",
    options: {
      A: "過去の経験に基づいて判断する。",
      B: "直感やひらめきを信じる。"
    }
  },
  { 
    id: 9, 
    text: "仕事の進め方は？", 
    type: "SN",
    options: {
      A: "手順やプロセスに従うのが好き。",
      B: "新しい方法や革新的なアイデアを試すのが好き。"
    }
  },
  { 
    id: 10, 
    text: "世界の理解の仕方は？", 
    type: "SN",
    options: {
      A: "五感を通じて世界を理解する。",
      B: "シンボルや隠れた意味を探る。"
    }
  },
  { 
    id: 11, 
    text: "判断の仕方は？", 
    type: "TF",
    options: {
      A: "論理的で客観的な判断を下す。",
      B: "人々の感情や価値観を考慮する。"
    }
  },
  { 
    id: 12, 
    text: "フィードバックの受け取り方は？", 
    type: "TF",
    options: {
      A: "批判的なフィードバックを受け入れやすい。",
      B: "和やかな人間関係を維持したい。"
    }
  },
  { 
    id: 13, 
    text: "重視する価値観は？", 
    type: "TF",
    options: {
      A: "公平性や正義を重視する。",
      B: "共感や調和を重視する。"
    }
  },
  { 
    id: 14, 
    text: "力を発揮する環境は？", 
    type: "TF",
    options: {
      A: "競争的な環境で力を発揮する。",
      B: "協力的な環境で力を発揮する。"
    }
  },
  { 
    id: 15, 
    text: "決定の仕方は？", 
    type: "TF",
    options: {
      A: "決定は頭で考える。",
      B: "決定は心で感じる。"
    }
  },
  { 
    id: 16, 
    text: "物事の進め方は？", 
    type: "JP",
    options: {
      A: "計画を立てて物事を進めるのが好き。",
      B: "柔軟に対応し、その場の流れに任せる。"
    }
  },
  { 
    id: 17, 
    text: "締め切りについて", 
    type: "JP",
    options: {
      A: "締め切りを守ることにストレスを感じない。",
      B: "締め切りが近づくと集中力が増す。"
    }
  },
  { 
    id: 18, 
    text: "決断のスピードは？", 
    type: "JP",
    options: {
      A: "決断を下すのが早い。",
      B: "選択肢を開いておくのが好き。"
    }
  },
  { 
    id: 19, 
    text: "ルールについて", 
    type: "JP",
    options: {
      A: "ルールや規則に従う。",
      B: "自由な発想で物事を考える。"
    }
  },
  { 
    id: 20, 
    text: "予定の変更について", 
    type: "JP",
    options: {
      A: "予定が変更になると不安を感じる。",
      B: "突発的な変更にも柔軟に対応できる。"
    }
  },
]

// MBTI data
const mbtiData = {
  ISTJ: {
    characteristics: "現実的、実際的、事実を重視する。責任感が強く、決定したことは確実に実行する。",
    learningStyle: "現実的で秩序を重んじるISTJタイプは、明確な手順や具体的な例を好みます。",
    description: "正義感の強い優等生",
    celebrities: [
      {
        name: "マイケル・ジョーダン",
        books: ["勝利への情熱", "リーダーシップの真髄", "チームワークの力"]
      },
      {
        name: "伊達公子",
        books: ["テニスと私", "努力の価値", "規律ある生活"]
      },
      {
        name: "クイーン・エリザベス2世",
        books: ["王室の伝統", "国家と責任", "変わりゆく時代での統治"]
      }
    ]
  },
  ISFJ: {
    characteristics: "温厚で協力的、他人に対する気配りができる。責任感が強く、粘り強い。",
    learningStyle: "他者への貢献を重視するISFJタイプは、学習内容が誰かの役に立つことを理解するとモチベーションが上がります。",
    description: "温厚で思いやりのある守護者",
    celebrities: [
      {
        name: "ビヨンセ",
        books: ["音楽への情熱", "家族の絆", "自己表現の力"]
      },
      {
        name: "宮崎駿",
        books: ["アニメーション芸術論", "想像力の源泉", "自然との共生"]
      },
      {
        name: "マザー・テレサ",
        books: ["愛の奉仕", "慈悲の心", "平和への道"]
      }
    ]
  },
  INFJ: {
    characteristics: "洞察力に優れ、他人のために尽くしたいという欲求を持つ。創造性と独創性がある。",
    learningStyle: "深い洞察力を持つINFJタイプは、抽象的な概念や内省する時間を必要とします。",
    description: "心の強さを兼ね備えた仕事人",
    celebrities: [
      {
        name: "マーティン・ルーサー・キング・ジュニア",
        books: ["非暴力の哲学", "夢を追いかけて", "社会正義の実現"]
      },
      {
        name: "夏目漱石",
        books: ["こころ", "私の個人主義", "文学論"]
      },
      {
        name: "ガンジー",
        books: ["真理の実験", "非暴力抵抗", "簡素な生活"]
      }
    ]
  },
  INTJ: {
    characteristics: "独創的な思考の持ち主で、高い基準を持つ。自分の能力と知識に自信を持っている。",
    learningStyle: "戦略的思考が得意なINTJタイプは、複雑な理論や自主的な学習を好みます。",
    description: "探究熱心な努力家",
    celebrities: [
      {
        name: "イーロン・マスク",
        books: ["持続可能なエネルギーの未来", "火星移住計画", "AI革命"]
      },
      {
        name: "岡本太郎",
        books: ["今日の芸術", "自分の中に毒を持て", "芸術は爆発だ"]
      },
      {
        name: "ニコラ・テスラ",
        books: ["エネルギーの秘密", "未来の科学", "発明家の心"]
      }
    ]
  },
  ISTP: {
    characteristics: "物事の原理原則を理解したいという欲求が強い。理論より経験を重視する。",
    learningStyle: "実践的な問題解決を好むISTPタイプは、手を動かして学ぶことで理解が深まります。",
    description: "寡黙で個人主義な職人",
    celebrities: [
      {
        name: "クリント・イーストウッド",
        books: ["映画監督術", "西部劇の魅力", "俳優としての心得"]
      },
      {
        name: "宮本武蔵",
        books: ["五輪書", "剣の哲学", "人生の極意"]
      },
      {
        name: "ブルース・リー",
        books: ["截拳道の真髄", "東洋哲学と武術", "自己表現としての格闘技"]
      }
    ]
  },
  ISFP: {
    characteristics: "温厚で感受性が強く、謙虚。自分の価値観を大切にし、他人の価値観も尊重する。",
    learningStyle: "芸術的な感性を持つISFPタイプは、クリエイティブな要素を取り入れた学習に興味を持ちます。",
    description: "感情豊かなあっさり芸術家",
    celebrities: [
      {
        name: "マイケル・ジャクソン",
        books: ["ダンスの革命", "音楽と社会変革", "パフォーマンスの芸術"]
      },
      {
        name: "黒澤明",
        books: ["映画作りの実践", "日本文化と映画", "視覚的ストーリーテリング"]
      },
      {
        name: "オードリー・ヘプバーン",
        books: ["優雅な生き方", "人道支援の意義", "内なる美しさ"]
      }
    ]
  },
  INFP: {
    characteristics: "理想主義者で適応力がある。他人の可能性を認め、引き出そうとする。",
    learningStyle: "理想主義的なINFPタイプは、自分の価値観と結びついた学習に熱心になります。",
    description: "独特のオーラを放つ理想主義者",
    celebrities: [
      {
        name: "ウィリアム・シェイクスピア",
        books: ["ソネット集", "劇作の技法", "人間性の探求"]
      },
      {
        name: "村上春樹",
        books: ["物語のつくり方", "翻訳という冒険", "走ることについて語るときに僕の語ること"]
      },
      {
        name: "J.R.R.トールキン",
        books: ["ファンタジー世界の創造", "言語と神話", "中世文学の魅力"]
      }
    ]
  },
  INTP: {
    characteristics: "理論的で論理的。知的好奇心が強く、アイデアに興味がある。",
    learningStyle: "分析的なINTPタイプは、理論的な内容や探求する自由を求めます。",
    description: "知的で個人主義なアイディアマン",
    celebrities: [
      {
        name: "アルバート・アインシュタイン",
        books: ["相対性理論入門", "科学と宗教", "創造性の源泉"]
      },
      {
        name: "川端康成",
        books: ["美しい日本の私", "文学の本質", "東洋と西洋の美意識"]
      },
      {
        name: "ビル・ゲイツ",
        books: ["テクノロジーと社会", "イノベーションの鍵", "慈善活動の意義"]
      }
    ]
  },
  ESTP: {
    characteristics: "行動力があり、問題解決能力に優れている。リスクを恐れず、現実的。",
    learningStyle: "行動的なESTPタイプは、即時的なフィードバックが得られるアクティブな学習を好みます。",
    description: "冒険心旺盛なアクションメーカー",
    celebrities: [
      {
        name: "マドンナ",
        books: ["自己表現の芸術", "女性のエンパワーメント", "音楽ビジネスの真実"]
      },
      {
        name: "石原さとみ",
        books: ["女優としての心得", "美しさの秘訣", "キャリアと私生活のバランス"]
      },
      {
        name: "ドナルド・トランプ",
        books: ["ディールの技術", "不動産投資戦略", "ブランド構築の秘訣"]
      }
    ]
  },
  ESFP: {
    characteristics: "社交的で明るく、人生を楽しむことを大切にする。協調性があり、現実的。",
    learningStyle: "社交的なESFPタイプは、楽しくインタラクティブな学習環境で力を発揮します。",
    description: "楽しいことが大好きなリア充自由人",
    celebrities: [
      {
        name: "マリリン・モンロー",
        books: ["スターの作り方", "内なる輝き", "ハリウッドの真実"]
      },
      {
        name: "明石家さんま",
        books: ["笑いの哲学", "トーク術の極意", "エンターテインメントの世界"]
      },
      {
        name: "ウィル・スミス",
        books: ["俳優としての成長", "家族と成功", "ポジティブシンキングの力"]
      }
    ]
  },
  ENFP: {
    characteristics: "情熱的で可能性を追求する。人々と関わることを好み、コミュニケーション能力が高い。",
    learningStyle: "創造的なENFPタイプは、新しいアイデアや可能性を探求する学習に魅力を感じます。",
    description: "コミュ力高めな素直主義者",
    celebrities: [
      {
        name: "ロビン・ウィリアムズ",
        books: ["コメディの技法", "即興の魔術", "笑いと涙の人生"]
      },
      {
        name: "久石譲",
        books: ["映画音楽の世界", "感動を生み出す旋律", "創造性と直感"]
      },
      {
        name: "エレン・デジェネレス",
        books: ["笑顔の力", "LGBTQの権利", "キンドネスの重要性"]
      }
    ]
  },
  ENTP: {
    characteristics: "知的好奇心が強く、新しいアイデアを生み出すのが得意。論理的で創造的。",
    learningStyle: "独創的なENTPタイプは、議論や問題解決を通じて学ぶことを楽しみます。",
    description: "陽キャで賢い変わり者",
    celebrities: [
      {
        name: "スティーブ・ジョブズ",
        books: ["イノベーションの哲学", "デザイン思考", "プレゼンテーションの技術"]
      },
      {
        name: "堀江貴文",
        books: ["多角経営の戦略", "挑戦する勇気", "未来を創る思考法"]
      },
      {
        name: "レオナルド・ダ・ヴィンチ",
        books: ["芸術と科学の融合", "観察の技術", "創造性の秘密"]
      }
    ]
  },
  ESTJ: {
    characteristics: "現実的で実際的。組織力に優れ、計画を立てて実行することを好む。",
    learningStyle: "組織的なESTJタイプは、明確な構造と実用性を持つ学習環境を好みます。",
    description: "ストイックで堅実な生徒会長",
    celebrities: [
      {
        name: "ジョージ・W・ブッシュ",
        books: ["リーダーシップの試練", "決断の瞬間", "国家運営の要諦"]
      },
      {
        name: "舛添要一",
        books: ["政治家の責務", "行政改革の道筋", "国際関係の展望"]
      },
      {
        name: "ヴィンス・ロンバルディ",
        books: ["勝利への執念", "チーム統率術", "規律と成功の関係"]
      }
    ]
  },
  ESFJ: {
    characteristics: "協調性があり、他人思いで世話好き。責任感が強く、調和を重んじる。",
    learningStyle: "協力的なESFJタイプは、チームワークや他者への貢献を重視します。",
    description: "誰にでも心優しき世話焼きさん",
    celebrities: [
      {
        name: "テイラー・スウィフト",
        books: ["歌詞の書き方", "ファンとの絆", "音楽業界でのサバイバル"]
      },
      {
        name: "綾瀬はるか",
        books: ["女優としての成長", "健康と美の秘訣", "ポジティブな生き方"]
      },
      {
        name: "ビル・クリントン",
        books: ["政治とリーダーシップ", "グローバル課題への取り組み", "人々をつなぐ力"]
      }
    ]
  },
  ENFJ: {
    characteristics: "カリスマ性があり、人々を導く能力に優れている。共感力が高く、協調性がある。",
    learningStyle: "指導力のあるENFJタイプは、他者を導くことで自身も学びます。",
    description: "周りを笑顔にするカリスマリーダー",
    celebrities: [
      {
        name: "オプラ・ウィンフリー",
        books: ["自己実現の道", "影響力の使い方", "逆境からの学び"]
      },
      {
        name: "坂本龍馬",
        books: ["明治維新の夢", "変革者の思考", "日本の未来像"]
      },
      {
        name: "バラク・オバマ",
        books: ["希望の政治学", "人種と社会", "アメリカンドリームの再定義"]
      }
    ]
  },
  ENTJ: {
    characteristics: "リーダーシップがあり、決断力に優れている。論理的で客観的な分析が得意。",
    learningStyle: "リーダーシップ志向のENTJタイプは、目標達成に向けた戦略的な学習を好みます。",
    description: "天性のカリスマリーダー",
    celebrities: [
      {
        name: "スティーブ・ジョブズ",
        books: ["ビジョナリーリーダーシップ", "イノベーションの哲学", "完璧を追求する姿勢"]
      },
      {
        name: "孫正義",
        books: ["300年ビジョン", "起業家精神", "テクノロジーと未来"]
      },
      {
        name: "マーガレット・サッチャー",
        books: ["鉄の女の信念", "経済改革の道筋", "政治とリーダーシップ"]
      }
    ]
  },
}

export function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 })
  const [result, setResult] = useState("")
  const [openBooks, setOpenBooks] = useState<{ [key: string]: boolean }>({})
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress((currentQuestion / questions.length) * 100)
  }, [currentQuestion])

  const handleAnswer = (answer: "A" | "B") => {
    const question = questions[currentQuestion]
    const newScores = { ...scores }
    if (answer === "A") {
      newScores[question.type[0] as keyof typeof scores] += 1
    } else {
      newScores[question.type[1] as keyof typeof scores] += 1
    }
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1)
    } else {
      const mbtiResult =
        (newScores.E > newScores.I ? "E" : "I") +
        (newScores.S > newScores.N ? "S" : "N") +
        (newScores.T > newScores.F ? "T" : "F") +
        (newScores.J > newScores.P ? "J" : "P")
      setResult(mbtiResult)
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 })
    setResult("")
    setOpenBooks({})
    setProgress(0)
  }

  const toggleBooks = (celebrityName: string) => {
    setOpenBooks(prev => ({ ...prev, [celebrityName]: !prev[celebrityName]  }))
  }

  if (result) {
    if (mbtiData[result as keyof typeof mbtiData]) {
      const { characteristics, learningStyle, description, celebrities } = mbtiData[result as keyof typeof mbtiData]
      return (
        <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">あなたのMBTIタイプは: {result}</CardTitle>
            <CardDescription className="text-lg">あなたの性格タイプの特徴と、同じタイプの有名人、おすすめの書籍をご紹介します。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2 text-primary">{result}</h3>
              <p className="text-xl text-muted-foreground">{description}</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">タイプの特徴:</h3>
              <p className="text-card-foreground">{characteristics}</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary">学習の好みの特徴:</h3>
              <p className="text-card-foreground">{learningStyle}</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">同じタイプの有名人:</h3>
              <ul className="space-y-6">
                {celebrities.map((celebrity, index) => (
                  <li key={index} className="border-b border-border pb-4 last:border-b-0">
                    <p className="font-medium text-lg text-card-foreground">{celebrity.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBooks(celebrity.name)}
                      aria-expanded={openBooks[celebrity.name]}
                      aria-controls={`books-${index}`}
                      className="mt-2"
                    >
                      {openBooks[celebrity.name] ? (
                        <>
                          おすすめ書籍を隠す
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          この人のおすすめの書籍は？
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    {openBooks[celebrity.name] && (
                      <ul id={`books-${index}`} className="mt-3 ml-6 list-disc text-card-foreground">
                        {celebrity.books.map((book, bookIndex) => (
                          <li key={bookIndex} className="mt-1">{book}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={resetTest} size="lg" className="mt-4">もう一度診断する</Button>
          </CardFooter>
        </Card>
      )
    } else {
      return (
        <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-destructive/10 to-secondary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-destructive">エラーが発生しました</CardTitle>
            <CardDescription className="text-lg">申し訳ありませんが、有効な結果を生成できませんでした。もう一度お試しください。</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={resetTest} size="lg" className="mt-4">もう一度診断する</Button>
          </CardFooter>
        </Card>
      )
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">質問 {currentQuestion + 1} / {questions.length}</CardTitle>
        <CardDescription className="text-lg">{questions[currentQuestion].text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progress} className="w-full" />
        <div className="flex flex-col space-y-4">
          <Button onClick={() => handleAnswer("A")} className="text-left justify-start py-6 text-lg hover:bg-primary/90 transition-colors">
            A: {questions[currentQuestion].options.A}
          </Button>
          <Button onClick={() => handleAnswer("B")} className="text-left justify-start py-6 text-lg hover:bg-primary/90 transition-colors">
            B: {questions[currentQuestion].options.B}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}