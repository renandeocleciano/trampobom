import sharp from 'sharp';

exports.compressImage = async (bf, size, name) => {
    const imageBuffer = decodeBase64Image(bf);
    const nameFile = name + '.webp'
    const newPath = './src/public/uploads/' + nameFile;
    return sharp(imageBuffer.data)
        .resize(size) 
        .toFormat('webp')
        .webp({
            quality: 100
        })
        .toFile(newPath)
        .then(data => {
            return nameFile;
        });
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = { type: null, data: null};
  
    if (matches.length !== 3) {
      return response;
    }
  
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
  
    return response;
  }