
# :notebook: Bionic ReadingTool 
A revolutionary way for guiding the eyes through text using artificial fixation spots to make reading easier. As a result, the reader's attention is drawn solely to the highlighted starting letters, leaving the word to be completed by the brain center. Bionic Reading attempts to foster greater in-depth reading and understanding of textual content in a digital environment dominated by shallow kinds of reading.

vite-react-tailwind-bionic-reading project 

![Bionic ReadingTool project image](./src/assets/bionic_reader_v2.PNG)
## What is Next? 🌟

| Name                                                                              | Short Description                                          | Status       |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------- |
| Save as PDF                                   | Create a button and download as PDF the text |:heavy_check_mark:
| Unicode Support                                   | Insert unicode characters | :heavy_check_mark:
| Show characters                                   | Display Characters after textarea | backlog
| Increase fonts                                   | Create functionality to increase/descrease fonts size | backlog


### How to Run

```bash
npm install && npm run dev
```

## PDF functionality
![Save text as PDF file](./src/assets/download_functionality.PNG)


## Contribution

Pull requests are welcome :)

## Preview
Frontend live demo ([click](https://crisanlucid.github.io/vite-react-tailwind-bionic-reading/))

---

## Release Flow

Step-by-step guide for releasing a new version.

### 1. Develop on a feature branch

```bash
git checkout -b feature/my-feature
# ... make changes ...
git add <files>
git commit -m "feat: my feature"
git push origin feature/my-feature
```

### 2. Open a Pull Request → merge into `main`

Opening a PR triggers:
- **Node.js CI** — installs deps, builds, runs tests
- **CodeQL** — security scan

Merging into `main` additionally triggers:
- **Build and Deploy** — deploys to GitHub Pages (only when source files change)

### 3. Bump the version

Go to **Actions → Bump version → Run workflow** and choose:
- `patch` → bug fixes / small improvements (0.5.0 → 0.5.1)
- `minor` → new features, backwards compatible (0.5.0 → 0.6.0)
- `major` → breaking changes (0.5.0 → 1.0.0)

This workflow will:
- Bump `package.json` + `package-lock.json` version
- Create a git tag (e.g. `v0.6.0`) and push it
- Open a PR named `chore: bump version to vX.X.X`

### 4. Merge the version bump PR

Merge the `chore: bump version to vX.X.X` PR into `main`. This automatically:
- Runs CI (install, build, test)
- Deploys to GitHub Pages
- **Creates a GitHub Release** with auto-generated notes

---

## Stars history

[![Stargazers over time](https://starchart.cc/crisanlucid/vite-react-tailwind-bionic-reading.svg)](https://starchart.cc/crisanlucid/vite-react-tailwind-bionic-reading)

