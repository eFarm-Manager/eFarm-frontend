export const parseXmlResponse = (xmlString) => {
  // Parse the XML string
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Find all the Attribute elements
  const attributes = xmlDoc.getElementsByTagName("Attribute");

  // Extract values into an object
  const data = {};
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    const name = attribute.getAttribute("Name");
    const value = attribute.textContent.trim();
    data[name] = value;
  }

  return data;
};
