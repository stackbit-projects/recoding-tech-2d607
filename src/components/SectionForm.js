import React from 'react';
import _ from 'lodash';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {markdownify} from '../utils';

// Material UI import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SectionForm(props) {
  let section = _.get(props, "section", null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Transforms the form data from the React Hook Form output to a format Netlify can read
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  let onSubmit = (formData, event) => {
    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-form", ...formData }),
    })
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        alert("Failed to submit contact form, please try again.", error);
      });
    event.preventDefault();
  };

  return (
    <section
      id={_.get(section, "section_id", null)}
      className="block block-form"
    >
      <Box sx={{ border: 1, p: 5, bgcolor: "#EFE9DA" }}>
        {_.get(section, "title", null) && (
          <Typography component="div" variant="h2" className="html-to-react">
            {_.get(section, "title", null)}
          </Typography>
        )}
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
          <label htmlFor="name">
            <Typography component="div" variant="subtitle1">
              Name:
            </Typography>
            <input name="name" type="text" {...register("name")} />
          </label>
          <label htmlFor="email">
            <Typography component="div" variant="subtitle1">
              Email:
            </Typography>
            {errors.email && (
              <span>
                Please ensure your email address is formatted correctly.
              </span>
            )}
            <input
              type="text"
              name="email"
              {...register("email", {
                required: true,
                pattern:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              })}
            />
          </label>
          <label htmlFor="message">
            <Typography component="div" variant="subtitle1">
              Message:
            </Typography>
            <textarea
              name="message"
              rows={10}
              {...register("inquiry")}
            ></textarea>
          </label>
          <div className="form-submit">
            <Button type="submit" className="button">
              {_.get(section, "submit_label", null)}
            </Button>
          </div>
        </form>
      </Box>
    </section>
  );
}
