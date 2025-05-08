<?php

namespace App\Schemas;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;


class BattleSchema
{




    public static function createProperties($properties)
    {

        $props = [];
        foreach ($properties as $key => $value) {
            $props[] = new StringSchema($key, $value);
        }

        return $props;
    }
}
