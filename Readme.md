# Prerequisites
Use the mac node installer https://nodejs.org/en/download/.

# Installation
Clone this repo.
run `npm install` within the jiffy-nft directory

# Usage
I've placed a demo under the inputs directory. All images to be processed will live in the inputs dir (for now at least). It's of the form 'inputs/project/files.png'.

The project directory holds gives us the name of the project as well as the dimensions of the final output via w + h prefixed numbers separated by underscores.

myguy_w300_h500 meahs this project is named 'myguy' and we want the resulting image to be 300x500 pixels.

Within the project directory, you'll see the component files. Component files are of the form name_version_x_y.png, where name is a thing to identify the component, version is the variant of it (we have two versions of the leg component here), and x+y are the coordinates where the component should be rendered.

run `node index.js` in the `jiffy-nft` directory. This will produce an output directory that contains a directory for each project. Within that directory you'll find a file representing each permutation based on component + version number. Rerunning will overwrite the contents of the project directory if present files have been updated.
