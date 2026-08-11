<?php

$url = $_GET['url'];

if (!isset($url)) {
    http_response_code(400);
    die('Error: Missing "url" parameter');
}

if (
    strpos($url, 'https://fonts.googleapis.com/css?') !== 0 &&
    strpos($url, 'https://fonts.gstatic.com/'       ) !== 0
) {
    http_response_code(400);
    die('Error: Invalid "url" parameter');
}

getFile($url);

function getFile($url) {
    $extensionFromUrl = '';
    if (strpos($url, 'https://fonts.googleapis.com/css?') === 0) {
        $extensionFromUrl = 'css';
    } else {
        try {
            if (strpos($url, 'https://fonts.gstatic.com/l/font?kit=') === 0) {
                $extensionFromUrl = 'woff2';
            } else {
                $extensionFromUrl = pathinfo(parse_url($url)['path'])['extension'];
            }
        } catch (Exception $e) {
            // do nothing
        }
    }

    $encoded_url = base64_encode($url);
    $filename = md5($encoded_url) . '.cache';
    if ($extensionFromUrl === 'css' || $extensionFromUrl === 'woff2') {
        $filename = $filename . '.' . $extensionFromUrl;
    } else {
        http_response_code(400);
        die('Error: Invalid "url" parameter ' . $url);
    }
    if (!file_exists('./.fonts-cache/' . $filename)) {
        cacheFile($url, './.fonts-cache/' . $filename);
    }

    if ($extensionFromUrl === 'css') {
        header('Content-type: text/css');
    } else if ($extensionFromUrl === 'woff2') {
        header('Content-type: font/woff2');
    }
    echo file_get_contents('./.fonts-cache/' . $filename);
}

function cacheFile($url, $filepath) {
    if (
        strpos($url, 'https://fonts.googleapis.com/css?') === 0 ||
        strpos($url, 'https://fonts.gstatic.com/'       ) === 0
    ) {
        $content = file_get_contents(
            $url,
            false,
            stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
                ]
            ])
        );

        if (!isset($content) || strlen($content) === 0) {
            http_response_code(500);
            die('Error: Unable to fetch data');
        }

        $selfUrl = $_SERVER['SCRIPT_NAME'];

        if (strpos($content, '?') === false) {
            $content = str_replace('https://', $selfUrl . '?url=https://', $content);
        } else {
            $content = preg_replace_callback(
                '/url\(([^)]+)\)/',
                function ($matches) use ($selfUrl) {
                    $url = $matches[1];
                    return 'url(' . $selfUrl . '?url=' . urlencode($url) . ')';
                },
                $content
            );
        }

        if (!is_dir('./.fonts-cache')) {
            mkdir('./.fonts-cache');
        }

        file_put_contents($filepath, $content);
    } else {
        http_response_code(400);
        die('Error: Invalid "url" parameter ' . $url);
    }
}

exit(0);

?>