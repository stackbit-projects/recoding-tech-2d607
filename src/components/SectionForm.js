import React from 'react';
import _ from 'lodash';
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

import {markdownify} from '../utils';
import FormField from './FormField';

import Typography from "@mui/material/Typography";

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm();

// const encode = (data) => {
//   return Object.keys(data)
//     .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// };

const SectionForm = props => {
  let section = _.get(props, 'section', null);
  return (
      <section
        id={_.get(section, "section_id", null)}
        className="block block-form"
      >
        {_.get(section, "title", null) && (
          <Typography component="div" variant="h2" className="html-to-react">
            {_.get(section, "title", null)}
          </Typography>
        )}
        <div className="block-content inner-sm">
          {_.get(section, "content", null) &&
            markdownify(_.get(section, "content", null))}
          <form
            name={_.get(section, "form_id", null)}
            id={_.get(section, "form_id", null)}
            {...(_.get(section, "form_action", null)
              ? { action: _.get(section, "form_action", null) }
              : null)}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <div className="screen-reader-text">
              <label>
                {"Don't fill this out if you're human: "}
                <input name="bot-field" />
              </label>
            </div>
            <input
              type="hidden"
              name="form-name"
              value={_.get(section, "form_id", null)}
            />
            {_.map(_.get(section, "form_fields", null), (field, field_idx) => (
              <FormField key={field_idx} {...props} field={field} />
            ))}
            <div className="form-submit">
              <button type="submit" className="button">
                {_.get(section, "submit_label", null)}
              </button>
            </div>
          </form>
        </div>
      </section>
  );
}

export default SectionForm;
