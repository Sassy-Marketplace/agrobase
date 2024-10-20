import axios from "axios";

export const pinFileToIPFS = async (files: any) => {
  try {
    let data = new FormData();
    data.append("file", files[0]);
    data.append("pinataOptions", '{"cidVersion": 0}');
    data.append("pinataMetadata", '{"name": "seda"}');
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      }
    );
    console.log(res.data);
    console.log(
      `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
    );
    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.log(error);
  }
};
