const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 275,
    minHeight: 200
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  gridMiddle: {
    paddingTop: theme.spacing.unit * 20,
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

export default styles
