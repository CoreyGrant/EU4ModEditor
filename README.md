<h4>The EU4 Mod Editor</h4>

<h3>WARNING: STILL IN VERY EARLY DEVELOPMENT, NOT READY FOR USE</h3>

<h4>What is the aim?</h4>

<p>I'm trying to write a fully-functional mod editor for the Paradox Grand Strategy game Europa Universalis 4. The end goal is a feature rich editing environment for creating custom EU4 content, with possible expansion to other similar Paradox games in the future.</p>
<p>This should ultimtely include being able to edit and add to every single file possible via much more friendly interfaces than a text editor and windows explorer</p>
<p>
The idea is quite simple. You either import an existing mod (current focus) or use a wizard to add a new mod (future). The application then reads all the files in those folders, sorts them, and organises them into a more ordered structure (the contents of the project folder). This also generates an export plan, which records all the original files the objects were read from.
</p>
<p>
Then, the project will be editable. Existing objects from the project (or the base game) will be extendable/copy+edit-able (i.e. idea groups/countries), new objects/images will be able to be added, and everything will be linked for proper validation. For example, historical advisors will have a dropdown menu for their type selected from the current list of advisors.
</p>
<p>
Some "object" screens (things like advisors, buildings, idea groups, countries etc etc) will also have a "preview" in a sidebar, which will show a much more readable (and screenshotable) preview of what you are editing (similar to EU4ModViewer).
</p>
<p>
Other types of files will be handed seperately, including lua scripts, yaml files, as many of the image types as possible (hopefully all), everything we can.
</p>
<p>
The export plan will be unique to each project, and it will link our various objects to their files, so we can export out a playable (if not exactly the same to imported) copy of the mod. The export plan will offer defaults for each new type of object, so all the new idea groups can be put in a specific file, or they can be put in any file wanted.
</p>
<p>
  There's plenty of possible features and improvements that could also be added, so if i've missed a feature you think is hugely important, let me know on the <a href="https://discord.gg/HMKN7tY7zV">discord</a>
</p>


To run in debug mode (no release mode yet), open CMD and run the following

<pre><code>
  // You only need to run this first line
  // once, or if you change the packages in package.json.
  C:\[project directory]> npm i
  C:\[project directory]> npm run debug
</code></pre>

<p>Currently a work in progres with no major functionality.</p>

<p>What's here (might be outdated):</p>

<ul><li>Basic framework for designing forms quickly, to allow easy configuration of editing different objects</li><li>
Simple parser to read clauzwitz objects</li><li>
A few forms designed for a couple of objects</li>

<p>What's to come:</p>

<ul><li>Might use a 3rd party parser, depending on compatability</li>
<li>Different object types</li>
<li>Exporting, export will add whichever folders are complete, so once exporting is implimented the screens which are done will be usable!</li>
<li>Image uploading/viewing</li>
<li>etc...</li>

<p>If you want to help, get in touch on the <a href="https://discord.gg/HMKN7tY7zV">discord</a>.</p>
<p>Tech</p>
<ul>
<li>Electron (using node and IPC) with VueJS/Vuex/Sass/Typescript for the "frontend"</li>
<li>Currently just on windows, although Electron should be good for cross-platform compatability it's IO heavy so I don't know</li>
<li>Everything is just the standard web stack, no database, json files. As much as possible has been pulled out into "config" like source files, so adding new forms/etc is very easy and fast.</li>
<li>It <i>might<i> be possible to create a web version, but the server end would take a fair bit of work, and is not currently the focus. Desktop is all we need for modding.</li>
</ul>