layout: about
image: /assets/img/blog/hydejack-9.jpg
description: >
  Software Engineer & M.S. student focused on application security,
  systems, and full‑stack development.
hide_description: true
redirect_from:
  - /download/
---

# About

<!--author-->

## Alex Asch

Software Engineer & M.S. student at UC San Diego with experience in application security, systems research, and full‑stack development.  
{:.lead}

- Email: a.asch2020@gmail.com  
- Location: San Diego, CA  
- GitHub: [aasch2020](https://github.com/aasch2020)  
- LinkedIn: [alex-asch](https://www.linkedin.com/in/alex-asch-755270219/)

Use the navigation to view my [Experience](/experience/), [Education](/education/), and [Projects](/projects/).


## Focus Areas

- Application Security: pentest triage, access control improvements, vulnerability remediation.
- Systems: KVM paging policy experiments and performance evaluation.
- Full‑stack: Golang + SQLite APIs; front‑end work with Angular/React.


## Highlights

- Application Security internship/contractor experience at Centric Software.
- Research/engineering projects across security, systems, and embedded computing.

<!--posts-->


## Selected Projects

<!--projects-->


## Resume

If you need a PDF resume, contact me via email and I’ll send the latest copy.


## Skills Snapshot

Python, C/C++, Java, Go, JavaScript/TypeScript, React, Angular, Docker, GDB, Burp Suite.


## Contact

For opportunities or questions, email me at a.asch2020@gmail.com.


## Syntax Highlighting
**Hydejack** features syntax highlighting, powered by [Rouge].

```html
<!-- file: `_includes/my-body.html` -->
<script type="module">
  document.querySelector("hy-push-state").addEventListener("hy-push-state-load", () => {
    const supportsCodeHighlights = false; // TBD!!
  });
</script>
```

Code blocks can have a filename and a caption.
{:.figcaption}


## Beautiful Math
They say math is beautiful — and with **Hydejack**'s [math support][math] it's guaranteed to also look beautiful:

$$
\begin{aligned}
  \phi(x,y) &= \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right) \\[2em]
            &= \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j)            \\[2em]
            &= (x_1, \ldots, x_n)
               \left(\begin{array}{ccc}
                 \phi(e_1, e_1)  & \cdots & \phi(e_1, e_n) \\
                 \vdots          & \ddots & \vdots         \\
                 \phi(e_n, e_1)  & \cdots & \phi(e_n, e_n)
               \end{array}\right)
               \left(\begin{array}{c}
                 y_1    \\
                 \vdots \\
                 y_n
               \end{array}\right)
\end{aligned}
$$

Hydejack uses KaTeX to efficiently render math.
{:.figcaption}


## Features

{% include features.md %}


## Download

{% include table.md %}


## Get It Now

Use the the form below to purchase Hydejack PRO:

<div class="gumroad-product-embed" data-gumroad-product-id="nuOluY"><a href="https://gumroad.com/l/nuOluY">Loading…</a></div>

[jekyll]: https://jekyllrb.com

[blog]: /
[portfolio]: https://hydejack.com/examples/
[resume]: https://hydejack.com/resume/
[download]: https://hydejack.com/download/
[welcome]: https://hydejack.com/
[forms]: https://hydejack.com/forms-by-example/

[features]: #features
[news]: #build-an-audience
[syntax]: #syntax-highlighting
[latex]: #beautiful-math
[dark]: https://hydejack.com/blog/hydejack/2018-09-01-introducing-dark-mode/
[search]: https://hydejack.com/#_search-input
[grid]: https://hydejack.com/blog/hydejack/

[lic]: LICENSE.md
[pro]: licenses/PRO.md
[docs]: docs/README.md
[ofln]: docs/advanced.md#enabling-offline-support
[math]: docs/writing.md#adding-math

[kit]: https://github.com/hydecorp/hydejack-starter-kit/releases
[src]: https://github.com/hydecorp/hydejack
[gem]: https://rubygems.org/gems/jekyll-theme-hydejack
[buy]: https://gum.co/nuOluY

[gpss]: https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fhydejack.com%2Fdocs%2F
[rouge]: http://rouge.jneen.net
[katex]: https://khan.github.io/KaTeX/
[mathjax]: https://www.mathjax.org/
