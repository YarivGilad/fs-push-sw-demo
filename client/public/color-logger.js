export const colors = {
    common: "padding: 2px 4px; border-radius: 3px; font-weight: bold;",
    yellow: "background: yellow; color: black;",
    green: "background: yellowgreen; color: black;",
    cyan: "background: cyan; color: black;",
    red: "background: red; color: white;",
    blue: "background: blue; color: white;",
    purple: "background: BlueViolet; color: white;",
    magenta: "background: magenta ; color: white;", 
    orange: "background: DarkOrange; color: white;",
    log(msg, color, ...args) {
        console.log(`%c ${msg} `, `${color} ${this.common}`, ...args ,);
        //console.trace(msg)
    }
}