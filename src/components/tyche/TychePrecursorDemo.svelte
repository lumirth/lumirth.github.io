<!-- DiceExpression.svelte -->
<script lang="ts">
    import { evaluateDiceExpression } from './diceExpression';
    let expression = '';
    let result = '';
    let history = '';
  
    function onSubmit() {
      if (expression === '' || expression === undefined) {
        history = 'Please enter a dice expression';
        return;
      }
      try {
        [result, history] = evaluateDiceExpression(expression);
        console.log(result, history)
      } catch (error) {
        history = error.message;
      }
    }
  </script>
  <div class="blockquote">
    <form on:submit|preventDefault={onSubmit}>
      <h1>Try it out!</h1>
      <!-- <hr class="hori-line"> -->
      <div class="input-and-buttons-container" style="align-items: left; justify-content:flex-start;">
        <input class="input-text-line" type="text" id="expression" bind:value={expression} />
        <button class="button" type="submit">Evaluate</button>
      </div>
      <br />
    </form>
    {#if result}
    <h2>Result: {result}</h2>
    {/if}
    {#if history}
    <pre class="code--block">{history}</pre>
    {/if}
  </div>
    