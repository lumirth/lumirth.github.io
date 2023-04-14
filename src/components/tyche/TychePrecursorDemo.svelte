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

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }
</script>
<div class="blockquote">
    <h1>Try it out!</h1>
    <div class="input-and-buttons-container" style="align-items: left; justify-content:flex-start;">
      <input class="input-text-line" aria-label="Enter dice roll expression" type="text" id="expression" bind:value={expression} on:keydown={handleKeyDown} />
      <button class="button" type="button" on:click={onSubmit}>Evaluate</button>
    </div>
    <br />
  {#if result}
  <h2>Result: {result}</h2>
  {/if}
  {#if history}
  <pre class="code--block">{history}</pre>
  {/if}
</div>
