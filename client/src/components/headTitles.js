import { capitalizeFirstLetter } from '../utilities/utilities'

export function headTitles(location) {
  return {
    pathArr: location.pathname.split('/'),
    path1: function () {
      return this.pathArr.length > 1 ? capitalizeFirstLetter(this.pathArr[1]) : 'Home'
    },
    path2: function () {
      return this.pathArr.length > 3 ? this.pathArr[3] : 'noSecondPath'
    },
    squibAndRoute: function () {
      return `Squib | ${this.path1()}`
    },
    home: 'Squib | Home',
    myprofile: function (auth) {
      const nameArr = auth && auth.user ? auth.user.name.split(' ') : 'No Name'
      const name = capitalizeFirstLetter(nameArr[0]) + ' ' + capitalizeFirstLetter(nameArr[1])
      return auth && auth.user ? `Squib | ${name}` : this.squibAndRoute()
    },
    this: function () {
      return this
    },
  }
}
