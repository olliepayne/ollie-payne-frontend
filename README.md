## Goals

My goal was to build a professional looking portfolio site using Node.js instead of using a site building app such as Wordpress or Webflow. These tools have their uses, but I wanted to demonstrate my ability with specific development technologies such as Next.js and Strapi, as well as learn more about them and front-end development during the building process.

## Technologies Used

### Front-End Technologies:

#### Next.js

What: Next.js is a framework for building web applications and provides additional structure, features, and optimizations. *Taken from the <a target=”_blank” rel=”nofollow noreferrer”>Next.js docs</a>*

Why?: I wanted the dynamic routing structure as well as the hybrid client / server rendering capabilities. Gatsby.js was also an option, but having used it previously it can be frustrating to work with sometimes due to it only offering SSG (Static Site Generation). For example: having to restart the local server after the CMS updates if you wish to see up to date content / test data during development.

#### Theme-UI

What: Theme-UI is a CSS-in-JS library for React-based projects.

Why?: There are many options for CSS-in-JS libraries, but Theme-UI’s implementation of the sx prop and out of the box integration with TypeScript made it a compelling choice.

### Back-End Technologies:

#### Strapi

Why: I have used Strapi professionally in the past so I knew that it integrates easily with React-based projects, as well as it is completely free (you just have to find a hosting solution).

#### Heroku

Why: I wanted a low budget (ideally free) option to host the CMS, since I don’t need a corporate level data storage / building solution, so I settled on Heroku. Heroku is also scalable, so if in the future I want to tinker more with SEO strategy and pay more attention to the blog, I am able to do so.

## Problems

### Data Fetching

One major problem that I ran into was deciding how to handle the data fetching for the /portfolio page. 

#### Why This was a Problem

I needed to allow the client to make calls to the CMS whenever a new skill tag was selected, while also maintaining the link equity of the case study pages through the “project cards”.

#### The Solution

Since the data needed to be filtered, It was more efficient to query to the CMS rather than filter on the front-end. However, to combat some case studies potentially not being displayed on the portfolio page causing the loss of link equity and clear internal linking structure, I fetched all of the case studies at build time as well as allowed the client to query to the CMS when filtering by skill tag.

So, by default, all of the various case studies are baked onto /portfolio at build time but only a few are initially visible to the user (taking advantage of <code>display: none</code> to show and hide vs using JavaScript, which is bad for SEO). More can be “loaded” with the “Load More” button (again, this just changes the <code>display: none</code> to <code>display: block</code>. Then, when the user filters via skill tag, all of the initial projects cards are no longer visible and the results correlate to the matching data from the CMS. This way, we preserve the SEO value while also incorporating the dynamic fetching to the back-end that is required for an efficiently handled filtering system.

### Parsing and Rendering Markdown (and HTML)

When importing a test case study that contained an external link that was written as anchor text (<code>\<a href=”URL”>My Link\</a></code>) vs as a markdown link, I noticed that the HTML wasn’t rendered as an element but was rather “escaped” and the HTML tag was rendered as visible text on the page.

#### Why This was a Problem

I wanted to be able to open external links in a new tab, with the <code>rel=”nofollow noreferrer”</code> attributes also applied since applying these increases the security of your site, and as far as I could see there is no way of doing this natively using markdown syntax.

#### Solution

A quick read through <a hreef="https://stackoverflow.com/questions/70548725/any-way-to-render-html-in-react-markdown" target="_blank" rel="nofollow noreferrer">this Stack Overflow post</a> taught me that the markdown parser that I’m using, <code>react-markdown</code>, only parses markdown copy / content and not HTML. Since markdown natively supports the writing of HTML, I assumed that any markdown parser that I chose was going to natively support the parsing of this HTML. To fix this, I installed the node package <code>rehype-raw</code> which is a plugin that is used to parse HTML from markdown, as opposed to escaping it and displaying the HTML tags as visible text on the page. I then imported this and passed it as a prop to the markdown parser like so: <code>\<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}\</ReactMarkdown></code>.

## My Favorite Features

### The Timeline on /experience

#### Why?

I am particularly proud of the job / education timeline on the experience page for a few reasons.
It was inspired by the LinkedIn experience timeline, which I think it resembles rather closely
I didn’t use any JS libraries
I was able to build it quickly without introducing many visual bugs. It was one of the first “mechanical” aspects of the site that I put together after having not coded for a while, making it a big confidence boost to know how to put that together quickly and efficiently.
It is reusable and can be even more scalable if I allow a more flexible approach to the data model that the HTML copy and content is mapped from.

### The Pagination Control on the Blog Page

#### Why?

Building this was fun because by this point I had managed a lot of the tricky aspects of the project such as deciding on a data fetching solution for both the portfolio page and the blog page, and finding a hosting solution / hosting the CMS. I already had the two shades of pinked picked out in my theme and they ended up working really nicely to distinguish between a mouse hover and the current results. It is also reusable and can be applied and styled quickly in future projects.

## Future Additions

In the future, one major addition I would like to add is a contact page, with a contact form. The form will post the contact message to an email provider, which will then be sent to my email.
