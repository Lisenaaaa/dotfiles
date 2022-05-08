import { sh } from './cover.ts'

const times = (await sh(['playerctl', 'metadata', '--format', '{{ position }}|{{ mpris:length }}', '--player=spotify'])).stdout.replace('\n', '').split('|')

console.log(Math.floor((parseInt(times[0]) / parseInt(times[1])) * 100))