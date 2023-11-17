import { post, advanced, page } from ".";

const Meta = (props) => {
  if (props._type == "advanced") {
    return advanced(props);
  }
  if (props._type == "post") {
    return post(props);
  }

  if (props._type == "page") {
    return page(props);
  }
};

export default Meta;
