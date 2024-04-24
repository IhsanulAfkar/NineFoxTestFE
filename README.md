# NineFoxLab Technical Case Study
## Usage

To use this repo, run these commands:
```
npm i
npm run dev
// or
npm run build
serve -s dist
```
## Tech Stacks
This project is build using
- Vite + React JS
- Typescript
- TailwindCSS
- react-router-dom

## Overview

This web consist of 2 pages:

### Root (/)

There are 8 inputs in forms with validation as well. For simplicity,
this project is using react-hook-form as form controller as well as validation.

- `Username`: text input with validation required and must unique.
- `Email`: email input with regex email validation and unique.
- `Phone Number`: text input with numeric regex validation and minimal 8 characters long.
- `Password`: There are four total validations for password to make it safety with minimum 8 character long, minimum one lowercase, uppercase, and numeric.
- `Confirm Password`: To make sure user know their own password.
- `Category`: A select input with options already provided.
- `Description`: Textarea input, required
- `Images`: Upload file with mime type is images (jpg, png, jpeg)

After submit, the page will wait for validation process in backend. If there's any error, the page will tell user via UI and error messages.

If succeed, then it will redirect to `/data`

For responsive, thanks to TailwindCSS for its mobile-first design, when i slicing (from figma for example) it makes me easier to manage responsiveness. Not to mention the typography, grid/flex, flexible images, button positioning, and much more must be considered between screen sizes to optimalize user experience.

### Data (/data)

This page only to view list of data submitted successfully from forms using tables without using external components. 


