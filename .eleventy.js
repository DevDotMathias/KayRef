const path = require('path');
const Image = require('@11ty/eleventy-img');

const relativeToInputPath = (inputPath, relativeFilePath) => {
   let split = inputPath.split("/");
   split.pop();
   return path.resolve(split.join(path.sep), relativeFilePath);
};

module.exports = eleventyConfig => {
   eleventyConfig.amendLibrary('md', markdown => { // generate 600px and 1200px versions with eleventy-img
      markdown.renderer.rules.image = (tokens, i) => {
         const src = relativeToInputPath('./src', tokens[i].attrGet('src'));
         const imageOptions = {
            widths: [600, 1200],
            formats: ['auto'],
            outputDir: path.join(eleventyConfig.dir.output, 'images'),
            urlPath: '/images/',
            filenameFormat: (id, src, width, format, options) => {
               const extension = path.extname(src);
               const name = path.basename(src, extension);
               return `${name}-${width}.${format}`;
            }
         };

         const metadata = Image.statsSync(src, imageOptions);
         Image(src, imageOptions);
         return Image.generateHTML(metadata, {
            alt: tokens[i].content,
            sizes: '(max-width: 767px) 600px, 1200px',
            loading: 'lazy',
            decoding: 'async',
         });
      }
   });

   // copy originals, because we don't need >1200px in the srcset, and eleventy-img auto is sometimes larger file size than orig
   eleventyConfig.addPassthroughCopy('images'); 

   // persist GH Pages custom domain
   eleventyConfig.addPassthroughCopy('CNAME');

   return {
      dir: {
         input: 'src',
         output: 'dist'
      }
   };
};