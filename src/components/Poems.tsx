import { Card } from "@/components/ui/card";

const poems = [
  {
    title: "Digital Dreams",
    date: "2024",
    excerpt: "In lines of code, a world takes form,\nWhere logic dances with the storm...",
    content: `In lines of code, a world takes form,
Where logic dances with the storm.
Each function calls, each loop returns,
The fire of creation burns.

Between the zeros and the ones,
A universe where nothing runs
But pure potential, crystallized
In syntax beautiful and wise.`,
  },
  {
    title: "Minimalist Manifesto",
    date: "2024",
    excerpt: "Less is the language of the soul,\nSimplicity, the highest goal...",
    content: `Less is the language of the soul,
Simplicity, the highest goal.
In empty space, the mind can breathe,
In clean design, the heart perceives.

No ornament, no excess weight,
Just essence, pure and intimate.
The strongest voice is often still—
White space, black type, and iron will.`,
  },
  {
    title: "The Algorithm of Being",
    date: "2023",
    excerpt: "We are patterns seeking patterns,\nCode that writes itself in time...",
    content: `We are patterns seeking patterns,
Code that writes itself in time.
Recursive loops of consciousness,
Self-referential, sublime.

Each thought a function, each emotion
A variable that changes state.
We debug our existence daily,
Refactor love, compile our fate.`,
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
