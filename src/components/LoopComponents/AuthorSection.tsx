import { Link } from "react-router-dom";

export function AuthorSection() {
  return (
    <div
      id="author"
      className="scroll-mt-24 mt-12 flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl">Author</h1>
      <p className="my-6 w-[50%] text-mutedText text-pretty text-center">
        Hi my name is Daniel Sterzel and I'm the author of this website. If you
        wish to see more of my work you can check out my GitHub and LinkedIn:
      </p>
      <div className="flex gap-4">
        <div className="hover:text-spotifyGreen">
          <Link to="https://github.com/danielsterzel">
            <i className="fa-brands fa-github"></i> My GitHub
          </Link>
        </div>
        <div className="hover:text-spotifyGreen">
        <Link to="https://www.linkedin.com/in/daniel-sterzel-2006a63a3/">
          <i className="fa-brands fa-linkedin"></i>My LinkedIn
        </Link>
        </div>
      </div>
    </div>
  );
}
