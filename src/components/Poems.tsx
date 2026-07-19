import { Card } from "@/components/ui/card";
import { usePoems } from "@/hooks/usePoems";

const Poems = () => {
  const { poems, loading, error } = usePoems();

  return (
    <section id="poems" className="min-h-screen px-6 py-20 bg-secondary/30">
      <div className="container max-w-5xl mx-auto fade-in">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Poems</h2>
          <p className="text-lg text-muted-foreground">
            Words arranged in patterns, thoughts crystallized in verse.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-8 animate-pulse">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="p-6 md:p-8 border-destructive/50">
            <p className="text-destructive">{error}</p>
          </Card>
        ) : (
          <div className="grid gap-8">
            {poems.map((poem) => (
              <Card
                key={poem.id}
                className="p-8 hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20 bg-background group cursor-pointer"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:opacity-70 transition-opacity">
                      {poem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(poem.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="font-serif text-muted-foreground whitespace-pre-line leading-relaxed">
                    {poem.content}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Poems;
