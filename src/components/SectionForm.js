import React from "react";
import _ from "lodash";
import { useForm, Controller } from "react-hook-form";

// utils
import { markdownify } from "../utils";
import client from "../utils/sanityClient";

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

  const onSubmit = (formData, event) => {
    event.preventDefault();

    const toSubmit = {
      _type: "contact_submission", // must match the name of the contact document type on the Sanity schema
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    if (!formData.botField)
      // submit only if botField is empty string
      client.create(toSubmit).then((res) => {
        alert("Thank you for submitting your message to Recoding.Tech!");
        reset();
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
              <input name="bot-field" {...register("botField")} />
            </label>
          </div>
          <input
            type="hidden"
            name="formId"
            value={_.get(section, "form_id", null)}
            {...register("formId")}
          />
          <Grid container justifyContent="space-evenly" spacing={2}>
            <Grid item xs={12} sm={6}>
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
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                    sx={{
                      backgroundColor: "#fff",
                    }}
                  />
                )}
                rules={{
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="message"
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
                    sx={{
                      backgroundColor: "#fff",
                    }}
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
