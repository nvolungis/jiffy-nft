const input = `This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous. Listen to what is happening. The writing is getting boring. The sound of it drones. It’s like a stuck record. The ear demands some variety.

Now listen. I vary the sentence length and I create music. Music. The writing sings. It has a pleasant rhythm, a lilt, a harmony. I use short sentences. And I use sentences of medium length. And sometimes when I am certain the reader is rested, I will engage them with a sentence of considerable length, a sentence that burns with energy and builds with all the impetus of a crescendo, the roll of the drums, the crash of the cymbals - sounds that say listen to this, it is important. 

So write with a combination of short, medium, and long sentences. Create a sound that pleases the reader’s ear. Don’t just write words. Write music.  `;

const sentenceMarker = "___";
const getParagraphs = (input) => input.split("\n\n");

const markSentences = (input) => {
  const chars = [
    [".", /\./g],
    ["!", /!/g],
    ["‽", /‽/g],
    ["?", /\?/g],
  ];
  return chars.reduce((memo, [char, pattern]) => {
    return memo.replace(pattern, `${char}${sentenceMarker}`);
  }, input);
};

const splitSentences = (paragraphs) =>
  paragraphs.map((paragraph) => paragraph.split(sentenceMarker));

const process = (input) => {
  const markedInput = markSentences(input);
  const paragraphs = getParagraphs(markedInput);
  return splitSentences(paragraphs);
}

console.log(process(input));
