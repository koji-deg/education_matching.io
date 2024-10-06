"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"


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
      {'name': '渋沢栄一', 'books': ['論語（四書五経）', '孟子（四書五経）', '日本外史']},
  {'name': '本田宗一郎', 'books': ['ざっくばらん', '私の手が語る', '松明は自分の手で']},
  {'name': 'Warren Buffett',
   'books': ['いま、翔び立つとき', 'SHOE DOG', '人と企業はどこで間違えるのか?---成功と失敗の本質を探る']}
    ]
  },
  ISFJ: {
    characteristics: "温厚で協力的、他人に対する気配りができる。責任感が強く、粘り強い。",
    learningStyle: "他者への貢献を重視するISFJタイプは、学習内容が誰かの役に立つことを理解するとモチベーションが上がります。",
    description: "温厚で思いやりのある守護者",
    celebrities: [
      {'name': '黒柳徹子', 'books': ['窓ぎわのトットちゃん', 'トットちゃんとソウくんの戦争', '小さいころに置いてきたもの']},
  {'name': 'Rosa Parks',
   'books': ['ローザ・パークス自伝 「人権運動の母」が歩んだ勇気と自由への道',
    '勇気と希望: ローザ・パークスのことば',
    '黒人の誇り・人間の誇り: ローザ・パークス自伝']},
  {'name': 'Gabrielle Chasnel',
   'books': ['ココとリトル・ブラック・ドレス',
    'COCO(ココ)はとびきりかわったコ',
    'ココ・シャネル 20世紀ファッションの創造者']}
    ]
  },
  INFJ: {
    characteristics: "洞察力に優れ、他人のために尽くしたいという欲求を持つ。創造性と独創性がある。",
    learningStyle: "深い洞察力を持つINFJタイプは、抽象的な概念や内省する時間を必要とします。",
    description: "心の強さを兼ね備えた仕事人",
    celebrities: [
      {'name': '手塚治虫', 'books': ['BLACK JACK', '火の鳥', 'ブッダ']},
  {'name': '宮沢賢治', 'books': ['銀河鉄道の夜', '注文の多い料理店', '新編 風の又三郎']},
  {'name': 'Martin Luther King Jr.',
   'books': ['黒人の進む道――世界は一つの屋根のもとに', '良心のトランペット', '黒人はなぜ待てないか']}
    ]
  },
  INTJ: {
    characteristics: "独創的な思考の持ち主で、高い基準を持つ。自分の能力と知識に自信を持っている。",
    learningStyle: "戦略的思考が得意なINTJタイプは、複雑な理論や自主的な学習を好みます。",
    description: "探究熱心な努力家",
    celebrities: [
      {'name': '宮崎駿', 'books': ['トム・ソーヤーの冒険', 'ロビンソン・クルーソー', 'ホビットの冒険']},
  {'name': '村上春樹', 'books': ['グレート・ギャツビー', 'ライ麦畑でつかまえて']},
  {'name': 'Elon Musk', 'books': ['スティーブ・ジョブズ', 'ゼロ・トゥ・ワン', 'ゲーム・プレイヤー']}
    ]
  },
  ISTP: {
    characteristics: "物事の原理原則を理解したいという欲求が強い。理論より経験を重視する。",
    learningStyle: "実践的な問題解決を好むISTPタイプは、手を動かして学ぶことで理解が深まります。",
    description: "寡黙で個人主義な職人",
    celebrities: [
      {'name': '高田純次', 'books': ['適当教典', '適当日記', '適当論']},
  {'name': '長嶋茂雄',
   'books': ['野球は人生そのものだ', '野球へのラブレター', '人生の知恵袋: ミスターと7人の水先案内人']},
  {'name': 'Bruce Lee',
   'books': ['截拳道への道', 'ブルース・リーノーツ: 内なる戦士をめぐる哲学断章', '真珠湾最後の真実']}
    ]
  },
  ISFP: {
    characteristics: "温厚で感受性が強く、謙虚。自分の価値観を大切にし、他人の価値観も尊重する。",
    learningStyle: "芸術的な感性を持つISFPタイプは、クリエイティブな要素を取り入れた学習に興味を持ちます。",
    description: "感情豊かなあっさり芸術家",
    celebrities: [
      {'name': '米津玄師', 'books': ['岡崎に捧ぐ', 'グラップラー刃牙', 'スノードーム']},
  {'name': 'Michael Jackson', 'books': ['老人と海', 'ピーター・パンとウェンディ']},
  {'name': 'Bob Dylan',
   'books': ['はじまりの日', 'ボブ・ディラン自伝', 'The Lyrics 1961-1973']}
    ]
  },
  INFP: {
    characteristics: "理想主義者で適応力がある。他人の可能性を認め、引き出そうとする。",
    learningStyle: "理想主義的なINFPタイプは、自分の価値観と結びついた学習に熱心になります。",
    description: "独特のオーラを放つ理想主義者",
    celebrities: [
      {'name': '新海誠', 'books': ['火星の人', '三体', '四月になれば彼女は']},
  {'name': '星野源', 'books': ['四月になれば彼女は', '東京の夫婦', '歌うように伝えたい']},
  {'name': 'J.R.R. Tolkien', 'books': ['指輪物語', 'シルマリルの物語', '終わらざりし物語']}
    ]
  },
  INTP: {
    characteristics: "理論的で論理的。知的好奇心が強く、アイデアに興味がある。",
    learningStyle: "分析的なINTPタイプは、理論的な内容や探求する自由を求めます。",
    description: "知的で個人主義なアイディアマン",
    celebrities: [
      {'name': '大前研一', 'books': ['企業参謀―戦略的思考とはなにか', '考える技術', '「0から1」の発想術']},
  {'name': '茂木健一郎', 'books': ['さよなら、野口健', '熱帯の夢', 'こきゅうの本']},
  {'name': 'Bill Gates', 'books': ['サピエンス全史', 'アインシュタイン その生涯と宇宙']}
    ]
  },
  ESTP: {
    characteristics: "行動力があり、問題解決能力に優れている。リスクを恐れず、現実的。",
    learningStyle: "行動的なESTPタイプは、即時的なフィードバックが得られるアクティブな学習を好みます。",
    description: "冒険心旺盛なアクションメーカー",
    celebrities: [
      {'name': '落合陽一', 'books': ['ノヴァセン', '教育の超・人類史', '孫子']},
  {'name': '武井壮', 'books': ['渋谷で働く社長の告白', '魔法の世紀', 'だから、俺はプロレスで夢を追う！']},
  {'name': 'Donald Trump',
   'books': ['あなたに金持ちになってほしい',
    'トランプ思考―知られざる逆転の成功哲学 [新版]明日の成功者たちへ',
    'トランプ最強の人生戦略']}
    ]
  },
  ESFP: {
    characteristics: "社交的で明るく、人生を楽しむことを大切にする。協調性があり、現実的。",
    learningStyle: "社交的なESFPタイプは、楽しくインタラクティブな学習環境で力を発揮します。",
    description: "楽しいことが大好きなリア充自由人",
    celebrities: [
      {'name': '綾瀬はるか', 'books': ['愛するということ', '鹿男あをによし', 'お～い！竜馬']},
  {'name': '大泉洋', 'books': ['騙し絵の牙', '大泉エッセイ ~僕が綴った16年', '夢の中まで語りたい']},
  {'name': 'Elvis Presley',
   'books': ['ELVISを夢見て―日本の中のプレスリー伝説', '私のエルヴィス', 'エルヴィスの真実 ゴスペルを愛したプレスリー']}
    ]
  },
  ENFP: {
    characteristics: "情熱的で可能性を追求する。人々と関わることを好み、コミュニケーション能力が高い。",
    learningStyle: "創造的なENFPタイプは、新しいアイデアや可能性を探求する学習に魅力を感じます。",
    description: "コミュ力高めな素直主義者",
    celebrities: [
      {'name': '有吉弘行', 'books': ['ゴミ清掃員の日常', '愚連街', 'キングダム']},
  {'name': '西野亮廣', 'books': ['ファンベース', '嫌われる勇気', 'クラウドソーシングでビジネスはこう変わる']},
  {'name': 'Robin Williams',
   'books': ['ノンデザイナーズ・デザインブック', '英国王立園芸協会ガーデンデザインブック', 'グッド・ウィル・ハンティング']}
    ]
  },
  ENTP: {
    characteristics: "知的好奇心が強く、新しいアイデアを生み出すのが得意。論理的で創造的。",
    learningStyle: "独創的なENTPタイプは、議論や問題解決を通じて学ぶことを楽しみます。",
    description: "陽キャで賢い変わり者",
    celebrities: [
      {'name': '堀江貴文',
   'books': ['魔法の世紀', '嫌われる勇気', '30歳で400億円の負債を抱えた僕が、もう一度、起業を決意した理由']},
  {'name': 'ひろゆき',
   'books': ['サードドア―精神的資産のふやし方', 'コンテナ物語：世界を変えたのは「箱」の発明だった', '五輪書']},
  {'name': 'Steve Wozniak', 'books': ['Appleのデジタル教育', 'サードドア: 精神的資産のふやし方']}
    ]
  },
  ESTJ: {
    characteristics: "現実的で実際的。組織力に優れ、計画を立てて実行することを好む。",
    learningStyle: "組織的なESTJタイプは、明確な構造と実用性を持つ学習環境を好みます。",
    description: "ストイックで堅実な生徒会長",
    celebrities: [
      {'name': '出井伸之',
   'books': ['変わり続ける―――人生のリポジショニング戦略',
    '迷いと決断',
    '進化するプラットフォーム グーグル・アップル・アマゾンを超えて']},
  {'name': '麻生太郎', 'books': ['とてつもない日本', '自由と繁栄の弧', '麻生太郎の原点 祖父・吉田茂の流儀']},
  {'name': 'Henry Ford',
   'books': ['自動車王フォードが語るエジソン成功の法則', '藁のハンドル―ヘンリー・フォード自伝', 'フォード経営―フォードは語る']}
    ]
  },
  ESFJ: {
    characteristics: "協調性があり、他人思いで世話好き。責任感が強く、調和を重んじる。",
    learningStyle: "協力的なESFJタイプは、チームワークや他者への貢献を重視します。",
    description: "誰にでも心優しき世話焼きさん",
    celebrities: [
      {'name': 'ビートたけし（北野武）', 'books': ['現場者', 'マボロシの鳥', '赤めだか']},
  {'name': '和田アキ子', 'books': ['おとなの叱り方', '啓示', '5年目のハイヒール']},
  {'name': 'Bill Clinton',
   'books': ['人として正しいことを', 'The President Is Missing: A Novel', 'My Life']}
    ]
  },
  ENFJ: {
    characteristics: "カリスマ性があり、人々を導く能力に優れている。共感力が高く、協調性がある。",
    learningStyle: "指導力のあるENFJタイプは、他者を導くことで自身も学びます。",
    description: "周りを笑顔にするカリスマリーダー",
    celebrities: [
      {'name': '明石家さんま', 'books': ['陽性', '晴れときどき西川家', 'クリスマスには焼き魚にローソクを']},
  {'name': 'Barack Obama', 'books': ['LIFE3.0', 'FACTFULNESS', '世界と僕のあいだに']},
  {'name': 'Oprah Winfrey',
   'books': ['I Know Why the Caged Bird Sings',
    'The Hill We Climb: An Inaugural Poem for the Country',
    'What I Know for Sure']}
    ]
  },
  ENTJ: {
    characteristics: "リーダーシップがあり、決断力に優れている。論理的で客観的な分析が得意。",
    learningStyle: "リーダーシップ志向のENTJタイプは、目標達成に向けた戦略的な学習を好みます。",
    description: "天性のカリスマリーダー",
    celebrities: [
      {'name': '孫正義', 'books': ['成功はゴミ箱の中に', 'ユダヤの商法', '竜馬がゆく']},
  {'name': 'Steve Jobs', 'books': ['白鯨', '肩をすくめるアトラス', 'イノベーションのジレンマ']},
  {'name': 'Margaret Thatcher', 'books': ['国富論', '自由論']}
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
      <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: `url('/blurry-gradient-haikei.svg')`, // publicフォルダへの相対パス
      backgroundSize: 'cover',
    }}>  
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">あなたの性格タイプは: {result}</CardTitle>
            <CardDescription className="text-lg">あなたの性格タイプの特徴と、同じタイプの有名人、おすすめの書籍をご紹介します。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2 text-primary">{result}</h3>
              <p className="text-xl text-muted-foreground">{description}</p>
            </div>
            <div className="flex justify-center">
              <Image
                src={`/${result}.jpg`}
                alt={`${result}タイプのイメージ図`}
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
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
      <li key={index} className="border-b border-border pb-4 last:border-b-0 flex items-center">
        {/* 画像を追加 */}
        <img 
          src={`${celebrity.name}.jfif`} 
          alt={celebrity.name} 
          className="w-24 h-24 mr-4 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-2xl text-card-foreground flex items-center">
            {celebrity.name}
            {/* Wikipedia検索ボタンを追加 */}
            <a 
              href={`https://ja.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(celebrity.name)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-4 inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-blue-300 hover:bg-blue-200"
            >
              Wikipedia
            </a>
          </p>
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
                <li key={bookIndex} className="mt-1 flex items-center">
                  {book}
                  {/* Amazon検索ボタンを追加 */}
                  <a 
                    href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(book)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-4 inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-gray-400 hover:bg-gray-300"
                  >
                    Amazon
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>



          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={resetTest} size="lg" className="mt-4">もう一度診断する</Button>
          </CardFooter>
        </Card>
        </div>
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
  <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: `url('/blurry-gradient-haikei.svg')`, // publicフォルダへの相対パス
      backgroundSize: 'cover',
    }}>
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          【性格タイプ診断】 質問 {currentQuestion + 1} / {questions.length}
        </CardTitle>
        <CardDescription className="text-lg">{questions[currentQuestion].text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progress} className="w-full" />
        <div className="flex flex-col space-y-4">
          <Button
            onClick={() => handleAnswer("A")}
            className="text-left justify-start py-6 text-lg hover:bg-primary/90 transition-colors"
          >
            A: {questions[currentQuestion].options.A}
          </Button>
          <Button
            onClick={() => handleAnswer("B")}
            className="text-left justify-start py-6 text-lg hover:bg-primary/90 transition-colors"
          >
            B: {questions[currentQuestion].options.B}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

}