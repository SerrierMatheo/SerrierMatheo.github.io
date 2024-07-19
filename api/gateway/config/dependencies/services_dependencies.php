<?php


use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return [

    'auth.client' => function (ContainerInterface $c) {
        $auth = gethostbyname('api.auth');
        return new Client(['base_uri' => 'http://'.$auth]);
    },


];