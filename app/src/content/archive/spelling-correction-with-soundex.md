---
title: 'Spelling correction with Soundex'
description: 'Refining Ian Barber''s PHP spelling corrector with the Soundex phonetic algorithm, raising accuracy from 71% to 83%.'
pubDate: 2009-11-06
tags: ['data-mining']
originalUrl: '/spelling-correction-with-soundex/2009/11/06/'
---

<small>**Image credit**: [http://theoatmeal.com/comics/misspelling](http://theoatmeal.com/comics/misspelling)</small>

A few days ago **Ian Barber** wrote [an article about the automated *spelling correction*](http://phpir.com/spelling-correction). Today I had the time to read it. Good quality and great presentation as always. However, the first thing I noticed is that the solution presented by Ian was not making use of the [Soundex](https://en.wikipedia.org/wiki/Soundex) algorithm at all, which seemed slightly strange to me according to my experience. So, I have quickly refined that solution using the standard `soundex()` PHP function.

### What is Soundex?

Although I linked the Soundex page on Wikipedia above, I would like to quote for you the summary explanation of what Soundex does.

> Soundex is a phonetic algorithm for indexing names by sound, as pronounced in English. The goal is for homophones to be encoded to the same representation (called soundex key) so that they can be matched despite minor differences in spelling. The algorithm mainly encodes consonants; a vowel will not be encoded unless it is the first letter.

### Let's use it

***NOTE**: To understand the following code, don't forget to read [Ian's article](http://phpir.com/spelling-correction) first.*

**The new `train()` function** ([originally embedded as a gist](https://gist.github.com/2057608))

```php
<?php

function train($file = 'big.txt') {
  $contents = file_get_contents($file);
  // get all strings of word letters
  preg_match_all('/\w+/', $contents, $matches);
  unset($contents);
  $dictionary = array();
  foreach ($matches[0] as $word) {
    $word = strtolower($word);
    $soundex_key = soundex($word);
    if (!isset($dictionary[$soundex_key][$word])) {
      $dictionary[$soundex_key][$word] = 0;
    }

    $dictionary[$soundex_key][$word] += 1;
  }
  unset($matches);
  return $dictionary;
}
```

If you compare this function to Ian's, you will notice that my dictionary is now indexed by soundex keys. For each key, we have a list of words and their frequency in the dictionary.

**The new `correct()` function** ([originally embedded as a gist](https://gist.github.com/2057608))

```php
<?php

function correct($word, $dic) {
  if (array_key_exists($word, $dic)) {
    return $word;
  }

  $search_result = $dic[soundex($word)];

  foreach ($search_result as $key => &$res) {
    $dist = levenshtein($key, $word);
    // consider just distance equals to 1 (the best) or 2
    if ($dist == 1 || $dist == 2) {
      $res = $res / $dist;
    }
    // discard all the other candidates that have distances other than 1 and 2
    // from the original word
    else {
      unset($search_result[$key]);
    }
  }

  // reverse sorting of the words by frequence
  arsort($search_result);

  // return the first key of the array (which will be the word suggested)
  foreach ($search_result as $key => $res) {
    return $key;
  }
}
```

What are the differences between this and the original function from Ian? Let's see. The first one is related, again, to the use of Soundex. The function takes into account only the words with the same soundex key as the input word in order to create a first set of candidates at the correction. This way, we can neglect all those words that might have a relevant *Levenshtein distance* but are very likely to be a wrong correction anyway, because they have a different soundex key. Then, once we have our set of potential candidates, we look for words with a relevant Levenshtein distance and weigh their frequency with their distance value. The words we haven't found a relevant Levenshtein distance for are removed from the set. Finally, this set of candidates is reversely ordered by the weighed frequency and the first one is chosen as best correction. If you now run the very same test Ian has written in his article, you will get an accuracy of **83%**, noticeably better than the **71%** achieved by the Norvig's solution presented by Ian.

### Further improvements

Both Ian and myself have relied on a limited dictionary and have not performed any kind of text preprocessing (such as stemming, etc.). With a larger dictionary and all the necessary preprocessing, I am confident to say you can expect this solution to perform even better.
