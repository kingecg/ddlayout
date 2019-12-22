export interface LayoutCell {
    col:number,
    row:number,
    wCol:number,
    [k : string]:any
}

export interface LayoutRect {
    top?:number,
    left?:number,
    width?:number,
    height?:number,
}

export interface GridLayout {
  containerWidth?:number,
  cols?:number,
  gutter?:number,
  rowHeight?:number  
}