const base64 = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const b64toBlob = ({ b64Data, contentType, sliceSize }) => {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const toImageBlob = async (file) => {
  const src = await base64(file);
  const block = src.split(";");
  const contentType = block[0].split(":")[1],
    realData = block[1].split(",")[1];
  return b64toBlob({ b64Data: realData, contentType });
};

export { toImageBlob };
