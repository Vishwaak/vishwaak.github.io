import { Card } from "@/components/ui/card";

const poems = [
  {
    title: "Mother Tongue",
    date: "2024",
    excerpt: "Talks about his love for another language",
    content: `
I loved you enough
To learn the cadence of your mother tongue,
I practiced the vowels and consonants,
To sound as close to you as I could.
But instead of falling in love with you,
I cheated on you.
I fell deeper for the rhyme of the language,
For its rhythm, it's song.
My heart grew wild for poems and phrases,
But not for you.
You dare not say you love me back—
Now it’s too late.
Your silence stretched like an endless shadow,
But at least your language still speaks to me.
`,
  },
];

const Poems = () => {
  return (
    <section id="poems" className="min-h-screen px-6 py-20 bg-secondary/30">
      <div className="container max-w-5xl mx-auto fade-in">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Poems</h2>
          <p className="text-lg text-muted-foreground">
            Words arranged in patterns, thoughts crystallized in verse.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group cursor-pointer"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                    {poem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{poem.date}</p>
                </div>
                <div className="font-serif text-muted-foreground whitespace-pre-line leading-relaxed">
                  {poem.content}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Poems;
