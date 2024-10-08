export const mockSuspectData = {
    "data": {
        "clusters": [
            {
                "id": 1,
                "items": [
                    {
                        "id": "video_1",
                        "intervals": [
                            {
                                "frame_interval": [
                                    0,
                                    3000
                                ]
                            }
                        ]
                    },
                    {
                        "id": "video_2",
                        "intervals": [
                            {
                                "frame_interval": [
                                    0,
                                    500
                                ]
                            },
                            {
                                "frame_interval": [
                                    1250,
                                    3750
                                ]
                            }
                        ]
                    }
                ],
                "thumbnail": "video_1_frame_0_94cabcc2-af36-3e54-9bdb-fc7f79c416ab.jpg"
            },
            {
                "id": 2,
                "items": [
                    {
                        "id": "video_1",
                        "intervals": [
                            {
                                "frame_interval": [
                                    250,
                                    2500
                                ]
                            }
                        ]
                    },
                    {
                        "id": "video_2",
                        "intervals": []
                    }
                ],
                "thumbnail": "video_1_frame_250_41c7aeaf-5650-38ee-8a70-2430b597289e.jpg"
            }
        ],
        "suspects": [
            {
                "id": "suspect",
                "k_clusters": [
                    1,
                    7,
                    2,
                    22,
                    12
                ],
                "k_clusters_similarity": [
                    0.8118478202850216,
                    0.6706884207023267,
                    0.6030283280099804,
                    0.5413569706059743,
                    0.5304609429980547
                ]
            },
            {
                "id": "suspect_2",
                "k_clusters": [
                    2,
                    12,
                    21,
                    22,
                    5
                ],
                "k_clusters_similarity": [
                    0.6264020501123412,
                    0.5426846108545117,
                    0.5285202229652942,
                    0.524479906381019,
                    0.5153616003826238
                ]
            }
        ]
    },
    "error_msg": "",
    "job_id": "2024-05-17_09:43:24_c1d83c1779"
}
