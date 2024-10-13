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

    howTo: [
    {'how':'計画的なスケジュール作成: ', 'how_description': '月間、週間、日間の計画を立てることで、勉強内容を分割して進めることができます。'},
    {'how':'ノートの整理: ', 'how_description':'丁寧で秩序あるノートを取ることで、学んだことを効率的に復習できます。'},
    {'how':'ルーティンの確立: ', 'how_description':'毎日同じ時間に勉強することで習慣化しやすくなります。'},
    {'how':'復習の徹底: ', 'how_description':'定期的な復習によって知識の定着が進みます。'},
    {'how':'集中できる環境の整備: ', 'how_description':'静かで整った環境で勉強すると集中力が高まります。'}
],

learningTools: [
    {'tool': 'タスク管理アプリ:', 'tool_description': 'TodoistやTrelloは、学習目標を明確にし、進捗を追跡するのに役立ちます。', 'link': ['https://todoist.com/ja','https://trello.com/ja']},
    {'tool': 'ノート整理ツール:', 'tool_description': 'OneNoteやEvernoteは、情報を整理しやすくするために有効です。', 'link': ['https://www.onenote.com/','https://evernote.com/intl/jp']},
    {'tool': 'オンライン学習プラットフォーム:', 'tool_description': 'CourseraやUdemyは、自分のペースで学ぶことができるため、ISTJに適しています。', 'link': ['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': '復習ツール:', 'tool_description': 'AnkiやQuizletは、復習に役立ちます。', 'link': ['https://apps.ankiweb.net/','https://quizlet.com/jp']},
    {'tool': '集中力向上ツール:', 'tool_description': 'ForestやFocus@Willは、集中力を高めるための音楽やタイマー機能を提供します。', 'link': ['https://www.forestapp.cc/','https://www.focusatwill.com/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


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

    howTo: [
    {'how':'視覚的記憶の活用: ', 'how_description': '図やグラフ、色分けされたノートを使用して情報を整理し記憶します。マインドマップを作成することも効果的です。'},
    {'how':'繰り返し学習: ', 'how_description':'一度覚えたことを繰り返すことで定着させる能力が高いです。毎日の復習をスケジュールに組み込み、クイズ形式で自分をテストします。'},
    {'how':'環境設定と集中力の高め方: ', 'how_description':'静かで整った環境で学ぶことを好みます。ポモドーロ・テクニックを活用して集中力を維持します。'},
    {'how':'具体的な目標設定: ', 'how_description':'短期的な目標と長期的な目標を設定し、計画的に学習を進めます。'}
],

learningTools: [
    {'tool': 'ノート整理アプリ:', 'tool_description': 'NotionやEvernoteを使用して学んだ内容を効率的に整理します。', 'link': ['https://www.notion.so/ja-jp','https://evernote.com/intl/jp']},
    {'tool': '時間管理アプリ:', 'tool_description': 'TodoistやTrelloを使って日々の学習計画を立て、進捗を確認します。', 'link': ['https://todoist.com/ja','https://trello.com/ja']},
    {'tool': 'グループ学習プラットフォーム:', 'tool_description': 'ZoomやGoogle Meetを利用して友人と一緒に勉強します。', 'link': ['https://zoom.us/','https://meet.google.com/']},
    {'tool': '復習ツール:', 'tool_description': 'AnkiやQuizletなどのフラッシュカードアプリを使用して復習します。', 'link': ['https://apps.ankiweb.net/','https://quizlet.com/jp']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],

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

    howTo: [
    {'how':'静かな環境での学習: ', 'how_description': '内向的な性格のため、静かな場所での学習が効果的です。'},
    {'how':'深い理解を求めるアプローチ: ', 'how_description':'概念や理論を深く理解することを重視します。'},
    {'how':'ビジュアルエイドの活用: ', 'how_description':'図やグラフ、マインドマップを活用することで情報を整理しやすくなります。'},
    {'how':'自己反省の時間を設ける: ', 'how_description':'学習の合間に自分の進捗や理解度を振り返る時間を設けます。'},
    {'how':'感情を大切にする: ', 'how_description':'ストレスや疲れを感じた際には無理せず休息を取ることが重要です。'}
],

learningTools: [
    {'tool': 'オンラインコースプラットフォーム:', 'tool_description': 'CourseraやUdemyは、自己主導型学習が可能で、多様なテーマについて深く学ぶことができます。', 'link': ['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'ディスカッションフォーラム:', 'tool_description': 'RedditやQuoraは、他者との対話やフィードバックが得られる場として活用できます。', 'link': ['https://www.reddit.com/','https://www.quora.com/']},
    {'tool': 'ビジュアルノートアプリ:', 'tool_description': 'NotionやMiroは、ビジュアル学習をサポートするために、情報を視覚的に整理できるアプリです。', 'link': ['https://www.notion.so/ja-jp','https://miro.com/ja/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


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

  howTo: [
    {'how':'学習計画の立案: ', 'how_description': 'SMARTゴールを設定し、詳細なスケジュールを作成します。これにより効率的な学習が可能になります。'},
    {'how':'自己学習: ', 'how_description':'オンラインコースや専門書を利用した独学が効果的です。CourseraやedXなどのプラットフォームを活用します。'},
    {'how':'深い理解の追求: ', 'how_description':'理論や概念を徹底的に研究し、マインドマップやチャートを使って情報を整理します。'},
    {'how':'モチベーション維持: ', 'how_description':'長期的な目標設定とマイルストーンの設定で自己効力感を高めます。'}
],

learningTools: [
    {'tool': 'Coursera:', 'tool_description': '世界中の大学や機関が提供するオンラインコースを受講できるプラットフォーム。自分のペースで学べます。', 'link': ['https://www.coursera.org/']},
    {'tool': 'Khan Academy:', 'tool_description': '無料で利用できる教育プラットフォームで、多様な科目について動画や練習問題が提供されています。', 'link': ['https://www.khanacademy.org/']},
    {'tool': 'Notion:', 'tool_description': '学習内容やプロジェクト管理を行うためのオールインワンツール。情報を整理し、効率的な学習が可能です。', 'link': ['https://www.notion.so/ja-jp']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


  ISTP: {
    characteristics: "物事の原理原則を理解したいという欲求が強い。理論より経験を重視する。",
    learningStyle: "実践的な問題解決を好むISTPタイプは、手を動かして学ぶことで理解が深まります。",
    description: "寡黙で個人主義な職人",

    howTo: [
    {'how':'ハンズオン学習', 'how_description': '実際に手を動かして学ぶことが重要です。例えば、実験やプロジェクトベースの学習が効果的です。'},
    {'how':'短期間での集中学習', 'how_description':'短い時間で集中して学ぶことで、効率よく情報を吸収できます。特に興味のあるテーマについて深く掘り下げることが有効です。'},
    {'how':'フィードバック重視', 'how_description':'学んだ内容について即座にフィードバックを受けることで、自分の理解度を確認しながら進めることができます。'}
],

learningTools: [
    {'tool': 'オンラインプラットフォーム', 'tool_description': 'CourseraやUdemyなどのプラットフォームでは、実践的なスキルを学べるコースが豊富に用意されています。特に技術系やクリエイティブ系のコースはISTPに適しています。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'プロジェクト管理ツール', 'tool_description':'TrelloやAsanaを使うことで、自分のペースでタスクを管理しながら進められ、独立した作業スタイルと相性が良いです。', 'link':['https://trello.com/ja','https://asana.com/ja']},
    {'tool': 'シミュレーションソフトウェア', 'tool_description':'技術的なスキルを磨くために、CADソフトウェアなど実際の作業環境を模したシミュレーションが役立ちます。', 'link':[]}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],



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

    howTo: [
    {'how':'視覚的な教材', 'how_description': '図や写真、動画を用いた学習が推奨されます。視覚的な情報を好むため、抽象的な概念を具体化し、理解を深めることができます。'},
    {'how':'自分のペースでの学習', 'how_description':'強制的なスケジュールや他人との比較はストレスの原因となるため、自分のリズムに合わせた計画を立てることが重要です。'},
    {'how':'短時間集中型の学習法', 'how_description':'ポモドーロ・テクニック（25分間集中して5分間休憩）などの方法を取り入れると良いでしょう。'},
    {'how':'実践的な体験学習', 'how_description':'実験やプロジェクトなどの体験型学習は、理論だけでは得られない知識と経験を提供します。'},
    {'how':'個人スペースの確保', 'how_description':'静かで落ち着いた環境で学ぶことで、集中力が高まり、学習効果が向上します。'}
],

learningTools: [
    {'tool': 'Canva', 'tool_description': 'デザインツールであり、視覚的なコンテンツ作成が容易です。ISFPは美的センスが高いため、自分のアイデアを視覚化するのに役立ちます。', 'link':['https://www.canva.com/ja_jp/']},
    {'tool': 'Trello', 'tool_description':'プロジェクト管理ツールであり、タスクを視覚的に整理できます。グループ活動やプロジェクトベースの学習において、進捗管理がしやすくなります。', 'link':['https://trello.com/ja']},
    {'tool': 'Khan Academy', 'tool_description':'多様なトピックについて動画と練習問題を提供する教育プラットフォームであり、自分のペースで学ぶことができます。特に視覚的な説明が多いため、理解しやすいです。', 'link':['https://www.khanacademy.org/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],

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

    
    howTo: [
    {'how':'自己主導型学習', 'how_description': '自分のペースで学ぶことを好むため、自己主導型の学習が効果的です。興味のあるテーマについて深く掘り下げることで、モチベーションを維持できます。'},
    {'how':'プロジェクトベース学習', 'how_description':'創造性を活かすために、実際のプロジェクトや課題を通じて学ぶ方法が適しています。'},
    {'how':'ビジュアル学習', 'how_description':'視覚的な情報（図やイラスト）を用いた学習が効果的です。'}
],

learningTools: [
    {'tool': 'Notion', 'tool_description': 'ノート作成やタスク管理ができるオールインワンツール。カスタマイズ可能なテンプレートやデータベース機能を使って、自分だけの学習環境を構築できます。', 'link':['https://www.notion.so/ja-jp']},
    {'tool': 'Trello', 'tool_description':'プロジェクト管理ツールで、視覚的にタスクを管理できるため、INFPにとって使いやすいです。', 'link':['https://trello.com/ja']},
    {'tool': 'Khan Academy', 'tool_description':'無料で多様な科目について学べるオンラインプラットフォーム。自分の興味に合わせてコースを選び、自分のペースで進めることができます。', 'link':['https://www.khanacademy.org/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],



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

    howTo: [
    {'how':'自己主導の学習', 'how_description': '自分の興味に基づいて学ぶことが最も効果的です。興味を持ったトピックについて深く掘り下げることができます。'},
    {'how':'論理的・分析的アプローチ', 'how_description':'複雑な情報を整理し、パターンを見つけ出す能力があります。情報をチャートやモデルにまとめることで理解を深めます。'},
    {'how':'柔軟なスケジュール管理', 'how_description':'タスク管理アプリを使用して、自分のペースでタスクを整理し、優先順位をつけることが効果的です。'},
    {'how':'自己テストとフィードバック', 'how_description':'自分で問題を作成し、それに挑戦することで理解度を確認できます。'}
],

learningTools: [
    {'tool': 'Khan Academy', 'tool_description': '無料で多様な科目についてオンラインで学べるプラットフォーム。動画講義と練習問題が豊富で、自分のペースで進められます。', 'link':['https://www.khanacademy.org/']},
    {'tool': 'Coursera', 'tool_description':'世界中の大学から提供されるオンラインコースプラットフォーム。専門的な知識を深めるための講座が多数あります。', 'link':['https://www.coursera.org/']},
    {'tool': 'Notion', 'tool_description':'ノート作成やタスク管理ができるオールインワンツール。自分専用のデータベースやウィキを作成できます。', 'link':['https://www.notion.so/ja-jp']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


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

    howTo: [
    {'how':'体験学習', 'how_description': '実際の体験を通じて学ぶことが最も効果的です。ワークショップやフィールドトリップなど、実践的な活動を通じて知識を得ることが好まれます。'},
    {'how':'インタラクティブな環境', 'how_description':'グループディスカッションやプロジェクトベースの学習など、他者との交流を含む学習スタイルが適しています。これにより、自分の意見を表現しながら学ぶことができます。'},
    {'how':'短期間での成果', 'how_description':'短期的な目標設定と迅速なフィードバックが重要です。達成感を得ることでモチベーションが高まります。'}
],

learningTools: [
    {'tool': 'オンラインコースプラットフォーム', 'tool_description': 'CourseraやUdemyなどのプラットフォームでは、多様な実践的コースが提供されており、自分のペースで学ぶことができます。特にプロジェクトベースのコースはESTPに適しています。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'グループ学習アプリ', 'tool_description':'SlackやDiscordなどのコミュニケーションツールは、グループでのディスカッションや共同作業を促進します。これにより、他者とのインタラクションを通じて学ぶことが可能です。', 'link':['https://slack.com/intl/ja-jp','https://discord.com/']},
    {'tool': '体験型イベント', 'tool_description':'MeetupやEventbriteなどで開催されるワークショップやセミナーは、ESTPが興味を持つテーマについて直接体験しながら学ぶ機会を提供します。', 'link':['https://www.meetup.com/ja-JP/','https://www.eventbrite.com/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


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

    howTo: [
    {'how':'グループ学習', 'how_description': '他者との交流を楽しむため、友達やクラスメートと一緒に学ぶことが効果的です。'},
    {'how':'実践的な活動', 'how_description':'体験を通じて学ぶことが得意で、フィールドワークやワークショップが適しています。'},
    {'how':'自己表現の機会', 'how_description':'エッセイやプレゼンテーションを通じて自分の意見を共有することが理解を深めます。'},
    {'how':'柔軟なアプローチ', 'how_description':'自分の興味に合わせて学習方法を選ぶことが推奨されます。'},
    {'how':'バランスの取れたスケジュール', 'how_description':'学習と遊びをバランスよく組み合わせることが重要です。'}
],

learningTools: [
    {'tool': 'Zoom/Google Meet', 'tool_description': 'グループ学習に役立つビデオ会議ツール。', 'link':['https://zoom.us/','https://meet.google.com/']},
    {'tool': 'Kahoot!/Quizlet', 'tool_description':'インタラクティブな学習ツールで、ゲーム感覚で学べます。', 'link':['https://kahoot.com/','https://quizlet.com/ja']},
    {'tool': 'Coursera/Udemy', 'tool_description':'多様なトピックのオンラインコースを提供し、自分のペースで学べます。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'YouTube', 'tool_description':'視覚的に情報を得ることができ、教育系動画が豊富です。', 'link':['https://www.youtube.com/']},
    {'tool': 'Slack/Discord', 'tool_description':'グループディスカッションや情報共有を促進します。', 'link':['https://slack.com/intl/ja-jp','https://discord.com/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],



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

    howTo: [
    {'how':'体験学習', 'how_description': '実際の体験を通じて学ぶことが効果的です。プロジェクトベースの学習やインターンシップなど、実践的な経験を重視します。'},
    {'how':'グループ学習', 'how_description':'他者とのディスカッションや共同作業を通じて理解を深めることが得意です。グループでのブレインストーミングやワークショップ形式の授業が向いています。'},
    {'how':'多様な教材', 'how_description':'視覚的・聴覚的な教材を活用し、さまざまな形式で情報を吸収することが効果的です。動画やポッドキャストなども活用すると良いでしょう。'},
    {'how':'自由度のある環境', 'how_description':'自分のペースで学べる環境が重要です。固定されたカリキュラムよりも、自分で選択できる自由度の高いプログラムが向いています。'}
],

learningTools: [
    {'tool': 'オンラインコースプラットフォーム', 'tool_description': 'CourseraやUdemyなど、様々な分野のコースが提供されており、自分の興味に合わせて選択できます。体験型のプロジェクトやグループディスカッションも含まれるコースがあります。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'ディスカッションフォーラム', 'tool_description':'RedditやQuoraは他者と意見交換できるプラットフォームで、新しい視点やアイデアを得ることができます。', 'link':['https://www.reddit.com/','https://www.quora.com/']},
    {'tool': 'プロジェクト管理ツール', 'tool_description':'TrelloやAsanaは自由度高くタスク管理できるツールで、グループプロジェクトにも対応しています。視覚的に進捗を管理できるため、ENFPにとって使いやすいです。', 'link':['https://trello.com/ja','https://asana.com/ja']},
    {'tool': 'マインドマッピングツール', 'tool_description':'MindMeisterやXMindはアイデアを視覚化し、関連性を整理するためのツールです。創造的な思考を促進し、新しいアイデアを生み出す手助けになります。', 'link':['https://www.mindmeister.com/','https://www.xmind.net/']}
],

extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],


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

    howTo: [
    {'how':'ディスカッションベースの学習', 'how_description': 'ENTPは議論やディスカッションを通じて学ぶことが効果的です。グループでの討論や意見交換が彼らの理解を深めます。'},
    {'how':'プロジェクトベースの学習', 'how_description':'実際のプロジェクトや課題に取り組むことで、理論だけでなく実践的なスキルも身につけることができます。自分のアイデアを試す機会が多いとモチベーションが高まります。'},
    {'how':'多様な情報源からの学習', 'how_description':'様々な視点や情報源から学ぶことで、より広範な理解が得られます。書籍、オンラインコース、ポッドキャストなど、多様なメディアを活用することが推奨されます。'}
],

learningTools: [
    {'tool': 'オンラインフォーラムやディスカッションプラットフォーム', 'tool_description': 'RedditやQuoraなどのプラットフォームでは、多様なトピックについて他者と議論し、自分の意見を発表することができます。', 'link':['https://www.reddit.com/','https://www.quora.com/']},
    {'tool': 'プロジェクト管理ツール', 'tool_description':'TrelloやAsanaなどのツールは、プロジェクトベースで学ぶ際に役立ちます。タスク管理や進捗確認ができ、自分のアイデアを具体化する手助けとなります。', 'link':['https://trello.com/ja','https://asana.com/ja']},
    {'tool': 'MOOCプラットフォーム', 'tool_description':'CourseraやedXでは、多様な分野のコースが提供されており、自分の興味に合わせた学び方が可能です。', 'link':['https://www.coursera.org/','https://www.edx.org/']}
],

    extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介', 'extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル', 'extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}
],

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
    howTo: [
        {'how':'タスクの優先順位付け: ', 'how_description': '重要なタスクをリストアップし、優先順位を付けて進めることで、計画的な進行が可能になります。'},
        {'how':'グループ学習', 'how_description':'友人や同僚と協力して学ぶことで、知識を共有し、新たな視点を得ることができます。'},
        {'how':'明確な目標設定:','how_description':'短期的・中期的・長期的な目標を立て、それに向かって努力することで達成感を得られます。'},
        {'how':'フィードバックの活用: ','how_description':'フィードバックを積極的に受け入れ、自分の弱点を知り、それを克服することで学習効果が高まります。'}],

    learningTools: [
    {'tool': 'プロジェクト管理ツール:', 'tool_description': 'TrelloやAsanaは、タスクを視覚的に整理し、優先順位を付けることができるため、ESTJの効率的な学習スタイルにマッチします。','link':['https://trello.com/ja','https://asana.com/ja']},
    {'tool': 'オンラインフォーラムや学習グループプラットフォーム:', 'tool_description':'DiscordやSlackを利用して、仲間と情報交換やディスカッションを行いながら学ぶことができます。','link':['https://discord.com/','https://slack.com/intl/ja-jp']},
    {'tool': 'オンライン学習プラットフォーム: ', 'tool_description':'CourseraやUdemyでは、講師からの直接的なフィードバックが得られるため、学習効果が高まります。','link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'スケジュール管理アプリ: ', 'tool_description':'Google CalendarやQuizletを使って、自分の学習計画を整然と進めることができます。','link':['https://calendar.google.com/','https://quizlet.com/jp']}],

    extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介','extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル','extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}],

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

    howTo: [
    {'how':'グループ学習', 'how_description': '他者と協力して学ぶことで、モチベーションが高まります。ディスカッションや共同作業を取り入れると効果的です。'},
    {'how':'フィードバックの活用', 'how_description':'他者からの評価を受けることで、自分の進捗を確認しやすくなります。'},
    {'how':'実践的なアプローチ', 'how_description':'理論だけでなく、実際の事例やプロジェクトに基づいた学習が効果的です。'},
    {'how':'構造化された環境', 'how_description':'明確なスケジュールや目標設定があると安心して学習できます。'}
],

learningTools: [
    {'tool': 'オンライン学習プラットフォーム', 'tool_description': 'CourseraやUdemyは、構造化されたコースを提供し、グループプロジェクトやディスカッションフォーラムも活用できます。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': 'フィードバックツール', 'tool_description':'Google Classroomは、教師や仲間からのフィードバックを受け取りやすく、自分の進捗を確認しながら学ぶことができます。', 'link':['https://classroom.google.com/']},
    {'tool': 'コミュニケーションアプリ', 'tool_description':'SlackやDiscordは、グループでの情報共有やディスカッションに便利です。', 'link':['https://slack.com/intl/ja-jp','https://discord.com/']}
],


     extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介','extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル','extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}],


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

    howTo: [
    {'how':'グループ学習', 'how_description': '他者とのコミュニケーションを得意とし、協力的な環境で学ぶことでモチベーションが高まります。友人や仲間と一緒に勉強することで、互いに教え合い、理解を深めることができます。'},
    {'how':'教えることを通じて学ぶ', 'how_description':'他者を助けることに喜びを感じるため、自分が学んだことを他人に教えることで、自身の理解も深まります。'},
    {'how':'目標設定', 'how_description':'具体的な短期・中期・長期の目標を設定し、それに向かって計画的に進むことで、達成感を得られます。'},
    {'how':'フィードバックの受け入れ', 'how_description':'教師や仲間からのフィードバックを通じて自分の弱点を知り、それを改善することで学習効果が高まります。'}
],

learningTools: [
    {'tool': 'グループ学習プラットフォーム', 'tool_description': 'ZoomやGoogle Meetを利用して、友人やクラスメートと一緒に勉強することが推奨されます。ディスカッションや共同作業を通じて理解を深めることができます。', 'link':['https://zoom.us/','https://meet.google.com/']},
    {'tool': 'フィードバックツール', 'tool_description':'Kahoot!やQuizletを使用して、クイズ形式で知識を確認し、仲間からのフィードバックを得ることで学習効果が高まります。', 'link':['https://kahoot.com/','https://quizlet.com/ja']},
    {'tool': '目標設定アプリ', 'tool_description':'TodoistやTrelloなどのタスク管理アプリを使用して、短期・中期・長期の目標を設定し、それに向かって進捗を管理することが推奨されます。', 'link':['https://todoist.com/','https://trello.com/ja']},
    {'tool': 'メンタリングプログラム', 'tool_description':'MentorCruiseなどのサービスを利用して、専門家からの指導やアドバイスを受けることができます。', 'link':['https://mentorcruise.com/']},
    {'tool': 'ビジュアル教材', 'tool_description':'YouTubeなどの動画プラットフォームで教育コンテンツを見ることで、視覚的に学ぶことができます。また、Piktochartを使って、自分の学びを視覚化することも効果的です。', 'link':['https://www.youtube.com/','https://piktochart.com/']}
],


    extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介','extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル','extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}],


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

    howTo: [
    {'how':'計画的なスケジュール作成', 'how_description': '長期的な目標を設定し、具体的なステップを明確にすることで学習の進捗を管理します。'},
    {'how':'議論やディスカッション', 'how_description':'他者との意見交換を通じて新たな視点を得ることが得意です。'},
    {'how':'フィードバックの活用', 'how_description':'他者からのフィードバックを受け入れ、学習方法や内容を調整します。'},
    {'how':'競争心を活かす', 'how_description':'模擬試験やグループ内での成績競争など、成果が明確に示される環境で学ぶことが効果的です。'}
],

learningTools: [
    {'tool': 'TrelloやAsana', 'tool_description': 'プロジェクト管理ツールで、目標設定や進捗管理を視覚的に行うことができます。', 'link':['https://trello.com/ja','https://asana.com/ja']},
    {'tool': 'SlackやMicrosoft Teams', 'tool_description':'コミュニケーションツールで、仲間と意見交換をしながら学ぶことができます。', 'link':['https://slack.com/intl/ja-jp','https://www.microsoft.com/ja-jp/microsoft-teams/group-chat-software']},
    {'tool': 'CourseraやUdemy', 'tool_description':'オンラインコースプラットフォームで、自分のペースで専門知識を深めることができます。', 'link':['https://www.coursera.org/','https://www.udemy.com/']},
    {'tool': '16Personalities', 'tool_description':'性格診断テストで、自分自身の強みや弱みを理解し、それに基づいた学習戦略を立てる手助けになります。', 'link':['https://www.16personalities.com/ja']}
],

    extra: [
    {'title': '社会人向け短時間学習ツール・サービスの紹介','extraLink':'https://www.genspark.ai/spark?id=8ea9aa02-c681-41ff-860e-e16664351b33'},
    {'title': '隙間時間に学べるおすすめのビジネス系YouTubeチャンネル','extraLink':'https://www.genspark.ai/spark?id=9e1f6c22-216b-4f86-ac65-dcd8081f8b80'}],


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
      const { characteristics, learningStyle, howTo, learningTools, description, celebrities, extra } = mbtiData[result as keyof typeof mbtiData]
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
              <h3 className="text-2xl font-semibold mb-3 text-primary bg-green-100">タイプの特徴:</h3>
              <p className="text-card-foreground " >{characteristics}</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-primary bg-green-100">学習の好みの特徴:</h3>
              <p className="text-card-foreground">{learningStyle}</p>
            </div>

             <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-primary bg-green-100">おすすめの学習法:</h3>
              <ul className="space-y-6">
                 {howTo.map((howTo, index) => (
                 <li key={index} className="border-b border-border pb-4 last:border-b-0 flex items-center">
                 <div>
                    <p className="font-semibold text-xl text-card-foreground flex items-center">
                    {howTo.how}
                    </p>
                    <p className="font-medium text-1xl text-card-foreground flex items-center">
                    {howTo.how_description}
                    </p>
                 </div>
                 </li>
                  ))}
              </ul>
             </div>




            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-primary bg-green-100">おすすめのツール・サービス:</h3>
              <ul className="space-y-6">
                 {learningTools.map((learningTools, index) => (
                 <li key={index} className="border-b border-border pb-4 last:border-b-0 flex items-center">
                 <div>
                    <p className="font-semibold text-xl text-card-foreground flex items-center">
                    {learningTools.tool}
                    </p>
                    <p className="font-medium text-1xl text-card-foreground flex items-center">
                    {learningTools.tool_description}
                    </p>

            <ul id={`link-${index}`} className="mt-3 ml-6 list-disc text-card-foreground">
              {learningTools.link.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-1 flex items-center">
                  {/* リンクボタンを追加 */}
                  <a 
                    href={link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-4 inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-gray-400 hover:bg-gray-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

                 </div>
                 </li>
                  ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-primary bg-green-100">その他、おすすめ情報:</h3>
              <ul className="space-y-6">
                 {extra.map((extra, index) => (
                 <li key={index} className="border-b border-border pb-4 last:border-b-0 flex items-center">
                 <div>
                    <a 
              href={extra.extraLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-2xl font-semibold inline-flex items-center px-4 py-2 border border-transparent text-xl leading-4 font-medium rounded-md text-white bg-gray-500 hover:bg-gray-300"
            >
                    {extra.title}
                  </a>


                 </div>
                 </li>
                  ))}
              </ul>
             </div>



            <div className="bg-card p-6 rounded-lg shadow">
  <h3 className="text-2xl font-semibold mb-4 text-primary bg-green-100">同じタイプの有名人:</h3>
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