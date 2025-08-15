# S4NDM4NHub

Welcome to **S4NDM4NHub**, my personal portfolio website showcasing my work as a passionate C# developer specializing in full-stack development with .NET. Built with [Hugo](https://gohugo.io/) and hosted on [GitHub Pages](https://pages.github.com/), this site highlights my projects, skills, and passion for crafting robust, scalable applications.

🌐 **Live Site**: [https://s4ndm4ndevweb.swiftscripters.workers.dev](https://s4ndm4ndevweb.swiftscripters.workers.dev)

## About

This portfolio reflects my journey as **S4NDM4N**, a developer who thrives on clean code, object-oriented principles, and creating solutions that are both efficient and maintainable. Explore my [Projects](https://s4ndm4ndevweb.swiftscripters.workers.dev/projects/) to see my work in action or visit the [About](https://s4ndm4ndevweb.swiftscripters.workers.dev/about/) page to learn more about me.

## Tech Stack

- **Static Site Generator**: Hugo (extended version for SCSS support)
- **Hosting**: Cloudflare Workers
- **Automation**: GitHub Actions for continuous deployment
- **Theme**: S$NDM4N C# Theme (My own custom built theme. Inspired by JetBrain's Rider)
- **Languages & Tools**: Markdown, C#, .NET, Git

## Getting Started

To run or contribute to this project locally, follow these steps:

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version recommended)
- [Git](https://git-scm.com/)
- A text editor (e.g., VS Code)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/S4NDM4N82/S4NDM4N82.github.io.git
   cd S4NDM4N82.github.io
   ```

2. **Initialize Submodules** (if using a theme as a Git submodule):

   ```bash
   git submodule update --init --recursive
   ```

3. **Install Hugo**:
   - Follow the [Hugo installation guide](https://gohugo.io/installation/) for your operating system.
   - Verify: `hugo version`

4. **Run Locally**:

   ```bash
   hugo server
   ```

   Open `http://localhost:1313` in your browser to preview the site.

### Project Structure

```
S4NDM4N82.github.io/
├── content/              # Markdown files for pages (e.g., about.md, projects/)
├── static/               # Static assets (e.g., images/, css/)
├── themes/               # Hugo theme (e.g., ananke/)
├── .github/workflows/    # GitHub Actions workflow for deployment
├── hugo.toml            # Hugo configuration file
├── README.md            # This file
```

## Deployment

The site is automatically deployed to `https://s4ndm4ndevweb.swiftscripters.workers.dev` using Cloudflare Workers. To update the site:

1. Make changes to content (e.g., `content/about.md` or `content/projects/`).
2. Commit and push to the `main` branch:

   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

3. GitHub Actions will build and deploy the site to the `gh-pages` branch.

See `.github/workflows/hugo.yml` for the deployment configuration.

## Contributing

Want to suggest improvements or report issues? Feel free to:

- Open an [issue](https://github.com/S4NDM4N82/S4NDM4N82.github.io/issues) for bugs or feature requests.
- Submit a pull request with your changes.

## Contact

Connect with me:

- GitHub: [S4NDM4N82](https://github.com/S4NDM4N82)
- Email: [sadaruwan12@gmail.com](mailto:your-email@example.com)
- Explore my projects at [https://s4ndm4ndevweb.swiftscripters.workers.dev](https://s4ndm4ndevweb.swiftscripters.workers.dev)

Thanks for visiting **S4NDM4NHub**! Let's build something awesome together.
