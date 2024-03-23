const { namespaceWrapper } = require('../_koiiNode/koiiNode');

class Audit {
  async validateNode(submission_value, winnerNum, round) {
    // Write your logic for the validation of submission value here and return a boolean value in response

    // The sample logic can be something like mentioned below to validate the submission
    let vote;
    const formattedSubmission = submission_value.substring(0, 2);
    console.log('SUBMISSION VALUE', formattedSubmission, winnerNum, round);
    try {
      if (formattedSubmission == winnerNum) {
        // For successful flow we return true (Means the audited node submission is correct)
        console.log('CONGRATULATIONS! YOU ARE THE WINNER!');
        vote = true;
      } else {
        // For unsuccessful flow we return false (Means the audited node submission is incorrect)
        console.log('Good luck next round! :D');
        vote = false;
      }
    } catch (e) {
      console.error(e);
      vote = false;
    }
    return vote;
  }

  async auditTask(roundNumber) {
    console.log('auditTask called with round', roundNumber);
    console.log(
      await namespaceWrapper.getSlot(),
      'current slot while calling auditTask',
    );
    await namespaceWrapper.validateAndVoteOnNodes(
      this.validateNode,
      roundNumber,
    );
  }
}
const audit = new Audit();
module.exports = { audit };
