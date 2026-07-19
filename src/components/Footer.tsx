const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vishwaak Chandran. All rights reserved.</p>
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
