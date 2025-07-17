export const options = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];

export default function TokenGenerator() {
  return (
    "TOKEN-" + Math.random().toString(36).substr(2) + Date.now().toString(36)
  );
}

export const rules = {
  task: {
    required: "Task title is required",
    minLength: {
      value: 3,
      message: "Task title must be at least 3 characters",
    },
  },
  problem: {
    required: "Problem description is required",
    minLength: {
      value: 10,
      message: "Please describe the issue in more detail",
    },
  },
  time: {
    required: "Time taken is required",
    pattern: {
      value: /^[0-9]+h\s?[0-9]*m?$/,
      message: "Time should be like '1h 30m' or '2h'",
    },
  },
  solution: {
    required: "Solution link is required",
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: "Enter a valid URL",
    },
  },
  date: {
    required: "Date is required",
  },
};
