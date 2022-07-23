# SocialMediaApi

An API for a non exitent website.

**Usage** 

<ul>
  <li>
    First download <a href="https://nodejs.org/en"> Node JS <a/> (if you don't have it) from the offical website
  </li>
  <li>
    Install Node JS
  </li>
    <li>
      Download the project
  </li>
    <li>
      Open the project in an editor
  </li>
    <li>
      Type <code>node .</code> in the editors terminal
  </li>
</ul>

**Queries** 
<ul>
  <li>
    tags: there are 7 tags <code>science</code>,<code>startups</code>,<code>health</code>,<code>design</code>,<code>tech</code>,<code>culture</code>,<code>history</code><br>
    to include mutliple tags spread them with a comma, e.g. <code>127.0.0.1:3000/api/posts?tags=tech,science</code>
  </li>
   <li>
    sortBy: either likes, popularity, id or reads
    <code>127.0.0.1:3000/api/posts?tags=tech,science&sortBy=likes</code>
  </li>
   <li>
    direction: either asc or desc
    <code>127.0.0.1:3000/api/posts?tags=tech,science&sortBy=likes&direction=desc</code>
  </li>
</ul>
