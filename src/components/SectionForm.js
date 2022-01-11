import React from "react";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";

import { markdownify } from "../utils";

// Material UI import
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 12,
    backgroundColor: "#c2cecc",
    textTransform: "uppercase",
  },
}));

export default function SectionForm(props) {
  let section = _.get(props, "section", null);

  const classes = useStyles();

  const { handleSubmit, register, control, reset } = useForm();

  /** Transforms the form data from the React Hook Form output
   * to a format Netlify can read  */
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const onSubmit = (formData, event) => {
    event.preventDefault();

    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-form", ...formData }),
    })
      .then((response) => {
        reset();
        alert("Your message has been submitted. Thank you!");
      })
      .catch((error) => {
        alert("Failed to submit contact form, please try again.", error);
      });
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="screen-reader-text">
            <label>
              {"Don't fill this out if you're human: "}
              <input name="bot-field" />
            </label>
          </div>
          <input
            type="hidden"
            name="formId"
            value={_.get(section, "form_id", null)}
            {...register("formId")}
          />
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            spacing={2}
            xs={12}
          >
            <Grid item>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Name"
                    value={value}
                    onChange={onChange}
                    variant="filled"
                    error={!!error}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    variant="filled"
                    helperText={
                      error
                        ? "Properly formatted email address is required"
                        : null
                    }
                  />
                )}
                rules={{
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="Message"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Message"
                    fullWidth
                    multiline
                    variant="filled"
                    rows={10}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                  />
                )}
              />
            </Grid>
            <Grid container item justifyContent="flex-end">
              <Button type="submit" className={classes.button}>
                {_.get(section, "submit_label", null)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </section>
  );
}
