const apiKey = "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";
const inputField = document.getElementById('inp');
const imagesContainer = document.querySelector('.images');

const getImage = async () => {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        "prompt": inputField.value,
        "n": 3,
        "size": "256x256",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const generatedImages = data.data;

    // Clear previous images
    imagesContainer.innerHTML = '';

    // Display new images
    generatedImages.forEach(photo => {
      const container = document.createElement("div");
      const img = document.createElement("img");

      container.appendChild(img);
      imagesContainer.appendChild(container);

      img.src = photo.url;
    });
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle errors gracefully (e.g., display an error message to the user)
  }
};

// Attach the event listener after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
  const generateBtn = document.getElementById('generateBtn');
  generateBtn.addEventListener('click', getImage);
});
