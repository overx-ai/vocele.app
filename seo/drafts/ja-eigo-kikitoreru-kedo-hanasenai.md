---
title: "英語が聞き取れるけど話せない理由と練習法"
slug: ja/blog/eigo-kikitoreru-kedo-hanasenai
keyword: 英語 聞き取れるけど話せない
cluster: A (ja)
intent: troubleshooting
serp_format: "Read 2026-11-04 via WebSearch (not Google JP rank) plus opened pages. Personal blogs and one school (merise, tabiei, ushikubou, goodbyejapan), 4k to 14k chars, 原因N選 + 練習法N選 + FAQ. PAA not visible; FAQ taken from the pages own FAQ blocks."
angle: "0 of 8 opened pages use MEXT data or the subject and verb-final mechanism. Ours explains why a Japanese speaker stops at the first two words, adds the official skill gap and TOEIC data, and a stage check."
meta_description: "英語が聞き取れるけど話せないのは、聞く力と話す力が別の技能だからです。文部科学省の調査データ、日本人が文の出だしでつまずく理由、どこで止まっているかの確かめ方、毎日の練習法を紹介します。"
sources:
  - url: https://www.mext.go.jp/a_menu/kokusai/gaikokugo/__icsFiles/afieldfile/2018/04/06/1403470_01_1.pdf
    supports: "2017 national random sample of national and public high schools, third year: A2+ 33.6 / 33.5 / 12.9"
  - url: https://www.mext.go.jp/content/20260424-mxt_kyoiku01-000049206_1.pdf
    supports: "Benesse report on MEXT site: third-year B1+ R1 to R6 listening 22.4 to 37.6, reading 10.8 to 33.0, speaking 26.7 to 20.6; A2+ speaking 92.4; GTEC takers, mostly university-bound schools"
  - url: https://www.iibc-global.org/hubfs/library/default/toeic/official_data/pdf/program-data-analysis-2026.pdf
    supports: "FY2025 examinees L&R 755,473 + 1,056,506, Speaking 12,207 + 36,727; test definitions"
  - url: https://www.ets.org/Media/Research/pdf/TC-10-13.pdf
    supports: "Listening-speaking r .65-.66, reading-speaking r .56-.57, N about 12,000, Korea and Japan; tests measure distinct aspects"
  - url: https://jalt-publications.org/tlt/articles/2198-output-and-beyond-dialogue-review-merrill-swains-current-approach-sla
    supports: "Swain: output makes learners notice what they do not know"
  - url: https://pressto.amu.edu.pl/index.php/ssllt/article/download/3834/3871
    supports: "Lockley 2015 summarising Yashima 2002: motivation alone not enough, confidence needed"
  - url: https://wals.info/chapter/101
    supports: "English subject pronoun obligatory"
  - url: https://www.bizmates.jp/blog/l%EF%BC%86r/
    supports: "online lessons are booked ahead (予約はレッスン5分前まで)"
  - url: https://en.wikipedia.org/wiki/Japanese_grammar
    supports: "SOV order, subject commonly omitted (read by researcher via fetch)"
  - url: "internal: seo/product.md exists list"
    supports: "iPhone only and unreleased; Luna and Lorenzo voice conversation; three modes (full scaffolding, corrections-only, immersive); correction spans; tap word for meaning; phrasebook by long-press with SRS; grammar in native language; per-word scoring, sound-level diagnosis, score history over weeks, phrase drills, phoneme detail, opt-in check on any spoken turn; daily plan from yesterday's errors; local reminders; 3-day free trial on all tiers"
  - url: "internal: seo/product.md free tier rule and src/i18n/ja.ts"
    supports: "free-tier sentence is the mandated wording, keep as is"
  - url: "internal: src/data/prices.ts"
    supports: "Core ¥2,500 and, where shown, tutor range ¥60,000〜75,000 for two lessons a week (schools listed in docs/specs/002); both are rendered from data"
experience_used:
  - "[2026-07] positioning: core pain as shame, not grammar; the learner who freezes in the team meeting, the parent whose kid translates (intro)"
  - "[2026-07] correction spans: where, not just what (練習 5)"
  - "[2026-07] positioning: sell against tutors (スクール H2)"
  - "[2026-07] gamification: no guilt copy on reminders (product)"
internal_links:
  - /ja/blog/l-to-r-no-hatsuon
  - /ja/pricing
  - /ja/fair-use
schema: "ArticleLayout emits BlogPosting, BreadcrumbList and FAQPage JSON-LD and renders the FAQ directly after the body; ArticleCta renders the CTA below"
status: draft
---

# 英語が聞き取れるけど話せない理由と練習法

<p>
英語が聞き取れるのに話せないのは、<strong>聞く力と話す力が別の技能だから</strong>です。聞くときは聞こえてきた文の意味をつかめば足りますが、話すときは主語を決め、語順を組み立て、声に出すところまでを自分でやります。この組み立ては聞くだけでは鍛えにくく、短い文を声に出して直してもらう練習が近道だと考えています。
</p>

<p>
私自身はVoceleという英語の会話練習アプリを作っている立場なので、中立ではありません。設計を始めたとき、学習者のいちばんの悩みは文法より恥ずかしさだと書き出しました。チームの会議で黙ってしまう人や、子どもに通訳してもらう親を思い浮かべて作ってきたので、この記事もその目線で書いています。
</p>

<h2>調査データでも、話す力は聞く力に追いついていない</h2>

<p>
<a href="https://www.mext.go.jp/a_menu/kokusai/gaikokugo/__icsFiles/afieldfile/2018/04/06/1403470_01_1.pdf">文部科学省が2017年度に行った全国調査</a>では、国公立高校の3年生のうちCEFR A2以上の割合は「聞くこと」33.6%、「読むこと」33.5%に対し、「話すこと」は12.9%でした。この開きの原因は性格よりも、学校で話す練習をどれだけ積んできたかの差だと見ています。
</p>

<p>
もっと新しいデータもあります。<a href="https://www.mext.go.jp/content/20260424-mxt_kyoiku01-000049206_1.pdf">文部科学省のサイトで公開されている令和7年度の調査分析</a>（ベネッセが実施。GTECを受けた生徒が対象で、大学進学者の多い学校に偏っています）から、高校3年生のB1以上の割合を抜き出しました。
</p>

<table>
<thead><tr><th>高校3年生のB1以上</th><th>令和元年度</th><th>令和6年度</th></tr></thead>
<tbody>
<tr><td>聞くこと</td><td>22.4%</td><td>37.6%</td></tr>
<tr><td>読むこと</td><td>10.8%</td><td>33.0%</td></tr>
<tr><td>話すこと</td><td>26.7%</td><td>20.6%</td></tr>
</tbody>
</table>

<p>
令和元年度は「話すこと」のほうが高かったのに、聞く力と読む力が大きく伸びた5年間で、話すことのB1以上は下がりました。別の生徒どうしの比較なので断定はできませんが、聞く力が伸びれば話す力も自然に伸びる、とは言えそうにありません。なお、この調査は対象も測り方も2017年度の調査と違うので、12.9%と比べることはできません。この層では、A2以上なら「話すこと」も92.4%に達していて、伸び悩みが見えるのはB1の手前です。
</p>

<h2>聞くときと話すときでは頭の使い方が違う</h2>

<p>
聞くときは、相手が作った文を受け取ります。知らない単語が一つあっても、前後の流れで補えます。話すときはそうはいきません。単語も時制も語順も自分で選び、穴を埋めてくれる人はいません。
</p>

<p>
第二言語習得研究者のメリル・スウェイン（Merrill Swain）は、人は話したり書いたりしてみて初めて「知らないこと、部分的にしか知らないこと」に気づくと<a href="https://jalt-publications.org/tlt/articles/2198-output-and-beyond-dialogue-review-merrill-swains-current-approach-sla">論じました</a>。いわゆるアウトプット仮説です。聞けば分かる表現なのに、いざ話そうとすると出てこない。あの経験が、まさにこの気づきです。
</p>

<p>
リスニングをいくら続けても、この気づきは得にくいはずです。聞いている間は、自分の文を作る場面がないからです。
</p>

<h2>日本人がつまずきやすいのは文の出だし</h2>

<p>
ここは日本語話者ならではの事情です。日本語は主語を省けますが、英語はくだけた会話を除けば主語を省けません。さらに日本語の動詞は文の最後に来ます。つまり日本語では、誰の話かも、するのかしないのかも、言い切る瞬間まで決めずに話し始められます。
</p>

<p>
英語は逆です。ふつうは文の頭で主語を、そのすぐ後で動詞や否定を決めます。「資料、昨日送っておきました」は主語がなくても自然な日本語ですが、英語にするなら話し始める前に、誰が誰に送ったのかを決める必要があります。英語が口から出てこないのは、多くの場合、この出だしの判断に時間がかかるからだと思います。
</p>

<table>
<thead><tr><th>言いたいこと</th><th>話し始める前に決めること</th><th>英語</th></tr></thead>
<tbody>
<tr><td>資料、昨日送っておきました</td><td>主語は I、相手は you</td><td><em>I sent you the file yesterday.</em></td></tr>
<tr><td>明日は難しそうです</td><td>否定を先に言う</td><td><em>I don't think I can make it tomorrow.</em></td></tr>
<tr><td>それなら大丈夫です</td><td>主語を「それ」にする</td><td><em>That works for me.</em></td></tr>
<tr><td>もう終わりました</td><td>主語と、何が終わったか</td><td><em>I've already finished it.</em></td></tr>
</tbody>
</table>

<p>
聞いているときは、この判断を相手が済ませてくれています。聞けば分かる文を自分で言えないのは、そのためです。
</p>

<h2>相手の前だと言葉が出てこない場合</h2>

<p>
一人なら言えるのに、人を前にすると言葉が出ないという場合もあります。八島智子氏の2002年の研究では、日本の学習者の場合、意欲があるだけでは足りず、自分の話す力に自信があって初めて話そうという気持ちになるという結果が出ています（<a href="https://pressto.amu.edu.pl/index.php/ssllt/article/download/3834/3871">Lockley 2015の整理</a>による）。やる気だけの問題ではありません。
</p>

<p>
その自信は、間違えても困らない場所で何度も話すうちについてくる、というのが私の考えです。
</p>

<h2>読めるのに話せない、TOEICは高いのに話せない場合</h2>

<p>
「読めるけど話せない」も「TOEICの点数は高いのに話せない」も、理由は同じです。TOEIC Listening &amp; Reading Testは、名前のとおり聞く力と読む力を測る試験で、話す力は別のSpeaking &amp; Writing Testsが測ります。<a href="https://www.iibc-global.org/hubfs/library/default/toeic/official_data/pdf/program-data-analysis-2026.pdf">2025年度の国内の受験者数</a>は、公開テストとIPテストを合わせてL&amp;Rが約181万人、Speakingは約4.9万人でした。L&amp;Rに比べると、スピーキングを受ける人はごくわずかです。
</p>

<p>
ETSが韓国と日本の受験者を中心に約1万2千人を分析した<a href="https://www.ets.org/Media/Research/pdf/TC-10-13.pdf">2010年の報告</a>では、リスニングとスピーキングのスコアの相関は0.65前後、リーディングとスピーキングは0.56前後でした。無関係ではありませんが、片方の点数からもう片方を予測できるほど強くもありません。報告書でも、各テストはそれぞれ別の力を見ていると述べています。ETSは両方の試験を作っている側なので、その点は割り引いて読んでください。いずれにしても、900点で話せない人がいても不思議ではありません。
</p>

<h2>どこで止まっているかを確かめる</h2>

<p>
「聞き取れる」と思っていても、意味を追えているだけで、音が頭に残っていない場合があります。原因によって練習が変わるので、次の順に試してみてください。
</p>

<table>
<thead><tr><th>試すこと</th><th>つまずいたときの原因</th><th>優先する練習</th></tr></thead>
<tbody>
<tr><td>短い英文を聞き、見ずに同じ文を言う</td><td>音が頭に残らない</td><td>リピーティング、シャドーイング</td></tr>
<tr><td>昨日の出来事を30秒、英語で話す</td><td>文を組み立てられない</td><td>主語から言う練習、瞬間英作文</td></tr>
<tr><td>同じ話を人の前でする</td><td>緊張で止まる</td><td>つなぎの表現、相手のいる練習</td></tr>
<tr><td>話した単語を相手に聞き返されないか確かめる</td><td>発音が通じていない</td><td>単語ごとの発音練習</td></tr>
</tbody>
</table>

<p>
聞き返される単語にLやRが入っているなら、<a href="/ja/blog/l-to-r-no-hatsuon">LとRの発音の違いと舌の使い方</a>を先に読むのが早道です。
</p>

<h2>話す力を伸ばす練習</h2>

<h3>1. 毎日5文、主語から声に出す</h3>
<p>
通勤中でも歯みがきの後でもかまいません。今日の予定や昨日あったことを、I で始まる短い文で5つ声に出します。<em>I have a meeting at ten.</em> のような文で十分です。難しい内容にせず、文の出だしの判断を速くすることだけを狙います。
</p>

<h3>2. 日本語を、言える日本語に直してから話す</h3>
<p>
「恐れ入りますが、ご検討いただけますと幸いです」をそのまま英語にしようとすると止まります。「考えてほしい」まで崩せば <em>Could you think about it?</em> と言えます。日本語の敬語や遠回しな言い方を訳そうとしないだけで、言える文は増えるはずです。
</p>

<h3>3. 瞬間英作文は、自分の話題でやる</h3>
<p>
瞬間英作文は、文を組み立てる速さを上げるのに向いています。ただ、教材の例文は答えが決まっていて、自分が言いたいことではありません。教材を一周したら、自分の仕事や予定の文に置き換えてください。実際に使う文のほうが、会議や雑談で出てきます。
</p>

<h3>4. 止まったときの一言を用意する</h3>
<p>
黙ってしまうと焦りが増えるので、考える時間を作る表現を先に覚えます。次の4つを、考えなくても出るまで言っておくと、沈黙の怖さが減ってきます。
</p>
<ul>
<li><em>Let me think for a second.</em>（少し考えさせてください）</li>
<li><em>What I mean is...</em>（つまり、言いたいのは）</li>
<li><em>How can I put it...</em>（なんと言えばいいか）</li>
<li><em>Sorry, could you say that again?</em>（もう一度お願いします）</li>
</ul>

<h3>5. 自分の文のどこが違ったか、その場で指摘してもらう</h3>
<p>
<em>I went to meeting yesterday.</em> と言って、正しい文を丸ごと返されても、抜けていたのが冠詞だったことは記憶に残りにくいものです。講師に習っているなら、言い直してもらうだけでなく、どの語が違ったのかを指してもらいましょう。Voceleでは、話した文の中の間違った箇所に印を付け、すぐ下に直し方を出すことにしました。別のカードに正解を書き直す方法もありましたが、それだと「何が正しいか」は分かっても「自分のどこが間違っていたか」が分からないからです。
</p>

<h3>6. 話した量を記録する</h3>
<p>
英語が話せないという感覚は、調子の悪い日の記憶で強くなります。今日声に出した文の数を書いておくだけで、続けているかどうかが見えます。話す力は急には変わらないので、数字が残っていれば、伸びているかどうかを落ち着いて判断できます。
</p>

<h2>英会話スクールには通ったほうがいいですか？</h2>

<p>
緊張に慣れたいなら通う価値はありますが、毎日の組み立て練習はスクールだけでは足りません。講師にははっきりした強みがあります。生身の相手を前にした緊張に慣れるには、人と話すしかありません。雑談の広がりや、仕事に合わせた助言も、講師のほうが上だと思います。
</p>

<p>
足りなくなりやすいのは回数です。マンツーマンのレッスンを週2回受けると月¥60,000〜75,000ほどかかり、それでも話す機会は週2回です。オンライン英会話なら費用は下がりますが、予約制のスクールでは相手と時間を合わせることになります。Voceleを作るときにマンツーマンレッスンを比較の相手にしたのは、スクールより手ごろに、毎日話せる場所を用意できると考えたからです。
</p>

<h2>Voceleでできること</h2>

<p>
VoceleはiPhone向けのAI語学コーチです。AIコーチのLunaやLorenzoと声で会話でき、サポートの手厚いモード、修正だけのモード、没入モードの3つから選べます。間違いは自分の文の中に印が付き、下に直し方が出ます。チャットの単語をタップすれば意味が分かり、長押しで保存したフレーズは、間隔反復で忘れたころにまた出てきます。
</p>

<p>
文法の説明は日本語で読めます。発音は単語ごとに採点され、週ごとのスコアの変化を確かめられます。その日の練習プランは、前日の間違いをもとに作られます。リマインダーはiPhone内の通知だけで、罪悪感をあおる文面は使わないと決めています。
</p>

<p>
VoceleはまだApp Storeで公開されていません。公開後は、無料アカウントでも限定された範囲でお試しいただけます。含まれる内容はアプリ内に表示されます。有料プランはCoreの月額¥2,500からで、どのプランにも3日間の無料トライアルがあります。<a href="/ja/pricing">料金プラン</a>と<a href="/ja/fair-use">プランごとの利用量</a>は、それぞれのページで確認できます。
</p>

## よくある質問

### 英語が理解できるのに話せないのも、同じ原因ですか？

ほぼ同じです。「聞き取れる」「読める」「理解できる」はどれも受け取る力で、話すには自分で文を作る力が要ります。ただ、読めるけれど聞き取れない場合は、英語の音に慣れる練習も並行して必要です。

### 聞き取れるけど意味が理解できないときは、どうすればいいですか？

音は拾えていても、単語や文の構造で引っかかっている状態です。話す練習の前に、スクリプトを読んで分からない箇所を確かめ、同じ音声をもう一度聞いてください。どこで意味が分からなくなるのかが見えてきます。

### 独学でも話せるようになりますか？

ひとりごと、録音、瞬間英作文で、文を組み立てる速さは独学でも伸ばせます。独学で足りなくなるのは、間違いに気づく機会と、相手の前で話す緊張です。この2つは、直してくれる相手を用意して補います。

### 話せるようになるまで、どれくらいかかりますか？

何か月で話せるとは言えません。今の力も、声に出して文を作る回数も人によって違うからです。目安としては、1分間に言えた文の数や、聞き返された回数を記録すると、変化を自分で確かめられます。

### オンライン英会話を受ければ話せるようになりますか？

話す相手がいるのは大きな利点ですが、受けるだけでは足りません。講師の話を聞いて相づちを打つだけのレッスンは、聞く練習に近くなります。話題を決めておき、自分が話す時間を増やしてください。

## CTA (ArticleCta, rendered by the layout)

まもなくiPhoneに登場する、AIコーチです。VoceleはまだApp Storeで公開されていません。公開後は、話した文を直し、発音を単語ごとに鍛えられるようになります。

---

## Scorecard (Step 7, fresh subagent judges)

Round 1: 75/100 FAIL. Round 2 (fresh judge, revised draft):

| Dimension | Score | Notes |
|-----------|-------|-------|
| Sounds human | 27/35 | Consistent voice; about 12 calques, 私は before verbs of thinking, two stock phrases |
| Product truth | 23/25 | Nearly all claims map; two glosses beyond frontmatter |
| Originality present | 13/15 | Three experience items, first person |
| Intent / format match | 9/10 | Causes, practice, FAQ match SERP note |
| Structure & schema | 9/10 | All blocks present; fair-use link missing from internal_links (added) |
| Sourced externals | 4/5 | All numbers sourced; 費用は下がります has no price source |
| **Total** | **85/100** | **PASS** |

Line edits taken from the round 2 fix list after scoring (language only, no new claims); not rescored.
