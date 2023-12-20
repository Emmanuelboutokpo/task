exports.formatDateToCustomFormat = (originalDate) =>{
     const date = new Date(originalDate);
     const months = [
       'Janv',
       'Févr',
       'Mars',
       'Avr',
       'Mai',
       'Juin',
       'Juil',
       'Août',
       'Sept',
       'Oct',
       'Nov',
       'Déc'
     ];
   
     const formattedDate = ` [${(date.getDate() < 10 ? '0' : '') + date.getDate()}-${
       months[date.getMonth()]
     }]`;
     
     return formattedDate;
   }
   
   exports.calculerDureeProjet = (dateDebut, dateFin) => {
     const debut = new Date(dateDebut);
     const fin = new Date(dateFin);

     const differenceEnMillisecondes = fin - debut;
   
     const unJourEnMillisecondes = 24 * 60 * 60 * 1000;
     const unMoisEnMillisecondes = 30.44 * unJourEnMillisecondes;  
     const uneAnneeEnMillisecondes = 365.25 * unJourEnMillisecondes; 
   
     const jours = Math.floor(differenceEnMillisecondes / unJourEnMillisecondes);
     const mois = Math.floor(differenceEnMillisecondes / unMoisEnMillisecondes);
     const annees = Math.floor(differenceEnMillisecondes / uneAnneeEnMillisecondes);
   
     return `La durée du projet est : ${annees ? `${annees} an${annees > 1 ? 's' : ''} ` : ''}${mois ? `${mois} mois ` : ''}${jours ? `${jours} jour${jours > 1 ? 's' : ''}` : ''}`;
   }
   