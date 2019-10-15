(() => {
  let options = [
    '"I think the candidates all did a great job of expressing what makes them different"',
    'Biden smirks, flubs a question',
    'Cringeworthy midwestern humor',
    'Wild interpretation of a Bernie plan',
    'Squabbling dogpile',
    'Speaking in Spanish',
    '"we must not forget the laborers"',
    'Yang proposes freedomcoin (again)',
    'A candidate eyerolls Williamson',
    'Someone indirectly calls Biden old',
    'longwinded personal narrative unrelated to the question',
    'Return to previous question',
    '[yelling] "sometimes you need more than a plan. You need action."',
    'dumpy white guy claims to represent all of Ohio/America, asks inscrutable question',
    'mumble mumble something about the troops',
    'fast cut to some centrist head who covers for Biden/Klobuchar',
    '"legitimate guns, like for hunting"',
    'Warren has answer, not called on, looks frustrated',
    'protesters!',
    'child(ren) used as a prop',
    'Candidate refers to Ohio as representative of all America',
    'Mention of impeachment',
    'Warren skirts some tax issue',
    'Biden references Obama',
    'Beto uses a cuss word',
    '"Working class" used in a way that actually means "working class whites"',
    'Biden tells longwinded story that goes nowhere',
    'A trash-tier candidate unleashes a brutal and obviously scripted attack on Biden',
    'Candidate obects to not getting to speak, mod allows 30 seconds; Candidate goes on for 2+ minutes',
    'Discussion of the plight of coal workers.',
    'Candidate says something only someone super wealthy would believe.',
    '"As a parent..."',
    '"As a Christian..."',
    'Only I can do bipartisan legislation',
    'Calling something bad but not critical a crisis',
    'Vague "opioids are bad" with no real plan',
    'Host flubs a question',
    '"let\'s take a look at the tweets"',
    'Climate question framed as "but what about my truk"',
    'Corey goes off about the mean streets of NJ',
    '"we need to show Putin..."',
    'Candidate mentions military service',
    'Sanders heart issue drama',
    'Candidate stands with Biden for some reason',
  ];
  const freespace = `FREE SPACE:\rCall for civility`;

  const shuffle = (options) => {
    let i, randomIndex, temp;
    for (j in options) {
      i = options.length - j;
      randomIndex = Math.floor(Math.random() * i);

      temp = options[i-1];
      options[i-1] = options[randomIndex];
      options[randomIndex] = temp;
    }
    return options;
  };

  const makeCell = (content, index) => {
    var cell = document.createElement('div');
    cell.classList.add('entry');
    cell.setAttribute('data-index', index);
    cell.innerHTML = content;
    return cell;
  };

  const fillBoard = (options, freespace) => {
    const board = document.querySelector('#board');
    let shuffled = shuffle(options);
    options = shuffled.slice(0,24);
    options.splice(12,0,freespace);
    let cells = options.map(makeCell);

    for (cellIndex in cells) {
      let cell = cells[cellIndex];
      if (cellIndex == 12) {
        cell.classList.add('freespace');
      }
      board.appendChild(cell);
    }
  };

  const checkRow = (entries, offset) => {
    for (i of Array(5).keys()) {
      if (!entries.includes(5*offset+i)) { return false; }
    }
    return true;
  };

  const checkColumn = (entries, offset) => {
    for (i of Array(5).keys()) {
      if (!entries.includes(5*i+offset)) { return false; }
    }
    return true;
  };

  const checkDiagonals = (entries) => {
    const sw = [0,6,12,18,24];
    const ne = [4,8,12,16,20];
    for (diagonal of [sw, ne]) {
      if (diagonal.every(d => entries.includes(d))) { return true; }
    }
    return false;
  };

  const checkForBingo = () => {
    let bingo = false;
    let checkedEntries = [];
    document.querySelectorAll('.checked, .freespace').forEach(
      e => checkedEntries.push(parseInt(e.dataset.index))
    );
    for (i of Array(5).keys()) {
      bingo = bingo || checkRow(checkedEntries, i);
    }
    for (i of Array(5).keys()) {
      bingo = bingo || checkColumn(checkedEntries, i);
    }
    bingo = bingo || checkDiagonals(checkedEntries);
    if (bingo) {
      console.log('bingo!');
    }
  }

  fillBoard(options, freespace);

  document.querySelectorAll('.entry').forEach(
    entry => entry.addEventListener(
      'click',
      () => {
        entry.classList.toggle('checked');
        checkForBingo();
      }
    )
  );
})()
