# Hydejack Starter Kit

A quicker, cleaner way to get started blogging with [Hydejack](https://hydejack.com/).

## Quick Start
### Running locally
1. Clone repository (git users), or [download] and unzip.
2. Open terminal, `cd` into root directory (where `_config.yml` is located)
3. Run `bundle install` [^1]
4. Run `bundle exec jekyll serve`
5. Open <http://localhost:4000/hydejack-starter-kit/>

## Resume / CV
This repository now includes a LaTeX source file for a resume: `resume.tex`.

To produce a PDF locally (recommended: XeLaTeX):

```powershell
# Example using XeLaTeX (Windows PowerShell)
choco install miktex -y        # if you don't have a TeX distribution (optional)
xelatex -shell-escape resume.tex
```

If you prefer `pdflatex` or `lualatex`, those work too. The file uses the AltaCV class and may require the `fontawesome5`, `simpleicons`, `roboto`, and `lato` packages; install them via your TeX distribution's package manager if compilation fails.

## What's next?
* Open files and read the comments
* Read the [docs](https://hydejack.com/docs/)
* Buy the [PRO version](https://hydejack.com/download/) to get the project and resume layout, newsletter subscription box, custom forms, and more.

[^1]: Requires Bundler. Install with `gem install bundler`.

[download]: https://github.com/hydecorp/hydejack-starter-kit/archive/master.zip
