<?php

namespace App\Schemas;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;


class BattleResponseSchema
{

    public static function createPrismSchema($name, $description, $properties)
    {


        $schema = new ObjectSchema(
            name: $name,
            description: $description,
            properties: self::createProperties($properties),
            requiredFields: array_keys($properties)
        );

        return $schema;
    }


    public static function createProperties($properties)
    {

        $props = [];
        foreach ($properties as $key => $value) {
            $props[] = new StringSchema($key, $value);
        }

        return $props;
    }
}
