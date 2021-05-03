import { parseString, processors } from 'xml2js';
import axios from 'axios';

const getFileExtension = (filename: string): string | undefined => {
  const extensionRegEx = new RegExp('[^.]+$');
  return filename?.match(extensionRegEx)?.[0];
};

const removeNoTrans = (value?: string) => {
  if (typeof value === 'string') {
    const updatedValue = value.replace('<notrans>', '').replace('</notrans>', '');
    return updatedValue;
  }
  return value;
};

const loadXML = (filename: string): Promise<Record<string, unknown> | null> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', filename);
    req.onload = async () => {
      if (req.readyState === 4 || req.status === 200) {
        const options = {
          trim: true,
          explicitArray: false,
          attrValueProcessors: [processors.parseBooleans],
          valueProcessors: [removeNoTrans, processors.parseBooleans]
        };
        parseString(req.responseText, options, (_err, res) => {
          if (res && res.data) {
            resolve(res.data);
          }
        });
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(Error(req.statusText));
    };
    req.send();
  });
};

const loadJSON = (filename: string): Promise<Record<string, unknown> | null> => {
  return new Promise((resolve, reject) => {
    axios
      .get(filename)
      .then(function (res) {
        if (res && res.data) {
          resolve(res.data);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  });
};

export const loadData = async (filename: string): Promise<Record<string, unknown> | null> => {
  const fileExtension = getFileExtension(filename);
  if (fileExtension === 'xml') {
    return await loadXML(filename);
  } else if (fileExtension === 'json') {
    return await loadJSON(filename);
  }
  return null;
};
