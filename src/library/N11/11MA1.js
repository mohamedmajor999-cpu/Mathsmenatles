// test usage de js au lieu de json
import math from '../../math.js'

export default exo = {
  ID: "11MA1",
  dest: ["11MA", "10MA", "9MA"],
  title: "Vocabulaire de la comparaison",
  type: "text",
  speech: 1,
  repeat: 3,
  description: "Comparer des segments, des colonnes",
  textSize: "medium",
  vars: {
    n: math.aleaInt(2, 8, 4, '^&'),
    n1: n[0],
    n2: n[1],
    n3: n[2],
    n4: n[3],
    max: Math.max(n1, n2, n3, n4),
    min: Math.min(n1, n2, n3, n4),
    biggest: [n1, n2, n3, n4].indexOf(max),
    smallest: [n1, n2, n3, n4].indexOf(min)
  },
  options: [
    {
      name: "Comparer des segments",
      vars: { choix: math.aleaInt(0, 1) },
      question: "Quel est le plus " + (choix == 0 ? 'long' : 'court') + " des segments ?",
      figure: {
        type: "chart",
        content: {
          type: "bar",
          data: {
            labels: ["A", "B", "C", "D"],
            datasets: [{
              label: "Segments",
              indexAxis: "y",
              barThickness: 5,
              base: 0,
              backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
              data: [n1, n2, n3, n4]
            }]
          }
        }
      },
      answer: "Le <b>plus " + (choix == 0 ? 'long' : 'court') + "</b> des segments est <span class='red'>le segment " + (choix == 0 ? ['A', 'B', 'C', 'D'][biggest] : ['A', 'B', 'C', 'D'][smallest]) + "</span>.",
      value: (choix == 0 ? ['A', 'B', 'C', 'D'][biggest] : ['A', 'B', 'C', 'D'][smallest])
    },
    {
      name: "Comparer des segments",
      vars: { choix: math.aleaInt(0, 1) },
      question: "Quel est le plus " + (choix == 0 ? 'grand' : 'petit') + " des batons ?",
      figure: {
        type: "chart",
        content: {
          type: "bar",
          data: {
            labels: ["A", "B", "C", "D"],
            datasets: [{
              label: "Batons",
              barThickness: 5,
              base: 0,
              backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
              data: [n1, n2, n3, n4]
            }]
          },
          options: {
            scales: {
              yAxis: {
                display: false
              }
            }
          }
        }
      },
      answer: "Le <b>plus " + (choix == 0 ? 'grand' : 'petit') + "</b> des batons est <span class='red'>le baton " + (choix == 0 ? ['A', 'B', 'C', 'D'][biggest] : ['A', 'B', 'C', 'D'][smallest]) + "</span>.",
      value: (choix == 0 ? ['A', 'B', 'C', 'D'][biggest] : ['A', 'B', 'C', 'D'][smallest])
    }, {
      name: "Comparer des distances",
      vars: { choix: math.aleaInt(0, 1), M: math.aleaInt(1, 8) },
      question: "Quel est baton le plus " + (choix == 0 ? 'près' : 'loin') + " du mur rouge ?",
      figure: {
        type: "chart",
        content: {
          type: "bar",
          data: {
            labels: ["A", M == 1 ? 'M' : '', M == 2 ? 'M' : '', M == 3 ? 'M' : '', M == 4 ? 'M' : '', M == 5 ? 'M' : '', M == 6 ? 'M' : '', M == 7 ? 'M' : '', M == 8 ? 'M' : '', "B"],
            datasets: [{
              label: "Batons",
              barThickness: 5,
              base: 0,
              backgroundColor: ["#3e95cd", M == 1 ? '#c45e58' : '#3e95cd', M == 2 ? '#c45e58' : '#3e95cd', M == 3 ? '#c45e58' : '#3e95cd', M == 4 ? '#c45e58' : '#3e95cd', M == 5 ? '#c45e58' : '#3e95cd', M == 6 ? '#c45e58' : '#3e95cd', M == 7 ? '#c45e58' : '#3e95cd', M == 8 ? '#c45e58' : '#3e95cd', "#3e95cd"],
              data: [3, M == 1 ? 5 : 0, M == 2 ? 5 : 0, M == 3 ? 5 : 0, M == 4 ? 5 : 0, M == 5 ? 5 : 0, M == 6 ? 5 : 0, M == 7 ? 5 : 0, M == 8 ? 5 : 0, 3]
            }]
          },
          options: {
            scales: {
              yAxis: {
                display: false
              },
              xAxis: {
                grid: { display: false }
              }
            }
          }
        }
      },
      answer: "Le <b>plus " + (choix == 0 ? 'près' : 'loin') + "</b> du mur rouge est <span class='red'>le baton " + (choix == 0 ? (M < 5 ? 'A' : 'B') : (M < 5 ? 'B' : 'A')) + "</span>.",
      value: (choix == 0 ? (M < 5 ? 'A' : 'B') : (M < 5 ? 'B' : 'A'))
    }, {
      name: "Comparer des distances (2)",
      vars: { choix: math.aleaInt(0, 1), M: math.aleaInt(0, 8, 2, '^&') },
      question: "Quel est baton le plus " + (choix == 0 ? 'près' : 'loin') + " du mur rouge ?",
      figure: {
        type: "chart",
        content: {
          type: "bar",
          data: {
            labels: ["M", M[0] == 0 ? 'A' : M[1] == 0 ? 'B' : '', M[0] == 1 ? 'A' : M[1] == 1 ? 'B' : '', M[0] == 2 ? 'A' : M[1] == 2 ? 'B' : '', M[0] == 3 ? 'A' : M[1] == 3 ? 'B' : '', M[0] == 4 ? 'A' : M[1] == 4 ? 'B' : '', M[0] == 5 ? 'A' : M[1] == 5 ? 'B' : '', M[0] == 6 ? 'A' : M[1] == 6 ? 'B' : '', M[0] == 7 ? 'A' : M[1] == 7 ? 'B' : '', M[0] == 8 ? 'A' : M[1] == 8 ? 'B' : ''],
            datasets: [{
              label: "Batons",
              barThickness: 5,
              base: 0,
              backgroundColor: ["#c45e58", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
              data: [5, M[0] == 0 || M[1] == 0 ? 3 : 0, M[0] == 1 || M[1] == 1 ? 3 : 0, M[0] == 2 || M[1] == 2 ? 3 : 0, M[0] == 3 || M[1] == 3 ? 3 : 0, M[0] == 4 || M[1] == 4 ? 3 : 0, M[0] == 5 || M[1] == 5 ? 3 : 0, M[0] == 6 || M[1] == 6 ? 3 : 0, M[0] == 7 || M[1] == 7 ? 3 : 0, M[0] == 8 || M[1] == 8 ? 3 : 0]
            }]
          },
          options: {
            scales: {
              yAxis: {
                display: false
              },
              xAxis: {
                grid: { display: false }
              }
            }
          }
        }
      },
      answer: "Le <b>plus " + (choix == 0 ? 'près' : 'loin') + "</b> du mur rouge est <span class='red'>le baton " + (choix == 0 ? (M[0] < M[1] ? 'A' : 'B') : (M[0] < M[1] ? 'B' : 'A')) + "</span>.",
      value: (choix == 0 ? (M[0] < M[1] ? 'A' : 'B') : (M[0] < M[1] ? 'B' : 'A'))
    }, {
      name: "Comparer des distances (3)",
      vars: { choix: math.aleaInt(0, 1), M: math.aleaInt(0, 8, 2, '^&') },
      question: "Quel est baton le plus " + (choix == 0 ? 'près' : 'loin') + " du mur rouge ?",
      figure: {
        type: "chart",
        content: {
          type: "bar",
          data: {
            labels: [M[0] == 0 ? 'A' : M[1] == 0 ? 'B' : '', M[0] == 1 ? 'A' : M[1] == 1 ? 'B' : '', M[0] == 2 ? 'A' : M[1] == 2 ? 'B' : '', M[0] == 3 ? 'A' : M[1] == 3 ? 'B' : '', M[0] == 4 ? 'A' : M[1] == 4 ? 'B' : '', M[0] == 5 ? 'A' : M[1] == 5 ? 'B' : '', M[0] == 6 ? 'A' : M[1] == 6 ? 'B' : '', M[0] == 7 ? 'A' : M[1] == 7 ? 'B' : '', M[0] == 8 ? 'A' : M[1] == 8 ? 'B' : '', "M"],
            datasets: [{
              label: "Batons",
              barThickness: 5,
              base: 0,
              backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#c45e58"],
              data: [M[0] == 0 || M[1] == 0 ? 3 : 0, M[0] == 1 || M[1] == 1 ? 3 : 0, M[0] == 2 || M[1] == 2 ? 3 : 0, M[0] == 3 || M[1] == 3 ? 3 : 0, M[0] == 4 || M[1] == 4 ? 3 : 0, M[0] == 5 || M[1] == 5 ? 3 : 0, M[0] == 6 || M[1] == 6 ? 3 : 0, M[0] == 7 || M[1] == 7 ? 3 : 0, M[0] == 8 || M[1] == 8 ? 3 : 0, 5]
            }]
          },
          options: {
            scales: {
              yAxis: {
                display: false
              },
              xAxis: {
                grid: { display: false }
              }
            }
          }
        }
      },
      answer: "Le <b>plus " + (choix == 0 ? 'près' : 'loin') + "</b> du mur rouge est <span class='red'>le baton " + (choix == 0 ? (M[0] > M[1] ? 'A' : 'B') : (M[0] > M[1] ? 'B' : 'A')) + "</span>.",
      value: (choix == 0 ? (M[0] > M[1] ? 'A' : 'B') : (M[0] > M[1] ? 'B' : 'A'))
    }
  ]
}